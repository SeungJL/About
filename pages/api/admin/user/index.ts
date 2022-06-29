import dayjs from "dayjs"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { isMember } from "../../../../libs/authUtils"
import { getToday, getInterestingDate } from "../../../../libs/dateUtils"
import dbConnect from "../../../../libs/dbConnect"
import { Attendence } from "../../../../models/attendence"
import { User } from "../../../../models/user"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'PATCH':
      const users = await User.find({status: 'active'})

      await Attendence.aggregate([
        {
          $match: {
            date: { $lt: getToday(), $gt: getToday().subtract(4, 'week') },
            participants: { $size: { $not: 0 } }
          },
        }
      ])
      break
    default:
      res.status(400).end()
      break
  }
}
