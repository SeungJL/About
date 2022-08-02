import { NextApiRequest, NextApiResponse } from "next"
import { MIN_USER_FOR_STUDY } from "../../../../../../constants/system"
import dbConnect from "../../../../../../libs/dbConnect"
import { strToDate } from "../../../../../../libs/utils/dateUtils"
import { Vote } from "../../../../../../models/vote"

const SECRET = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const secret = req.headers.secret
  const dateStr = req.query.date as string
  
  const date = strToDate(dateStr).toDate()

  await dbConnect()
  
  switch(method) {
    case 'PATCH':
      if (secret !== SECRET) {
        return res.status(403).end()
      }
      const vote = await Vote.findOne({ date })

      vote.participations.forEach((participation) => {
        if (participation.attendences.length < MIN_USER_FOR_STUDY) {
          participation.status = 'dismissed'
        } else {
          participation.status = 'waiting_confirm'
        }
      })
    
      await vote.save()
      return res.status(204).end()
  }

  return res.status(404).end()
}