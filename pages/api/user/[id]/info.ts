import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../libs/dbConnect';
import { Attendence } from '../../../../models/attendence';
import { getToken } from 'next-auth/jwt';
import { getInterestingDate, getToday } from '../../../../libs/utils/dateUtils';
import { User } from '../../../../models/user';
import { UserAttendenceInfo } from '../../../../models/userAttendenceInfo';
import { isMember } from '../../../../libs/utils/authUtils';

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserAttendenceInfo>
) {
  const uid = req.query.id as string
  const { method } = req
  const token = await getToken({ req, secret })

  if (!token || !isMember(token.role as string)) {
    res.status(401).end()
    return
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      const user = await User.findOne({uid: uid})
      const attendences = await Attendence.find({
        date: {
          $gte: getToday().add(-4, 'week').toDate(),
          $lte: getInterestingDate().add(-1, 'day').toDate(),
        },
        'participants.user': user._id,
      }).populate('participants.user')

      res.status(200).json({ user, attendences })
      break
    default:
      res.status(400).end()
      break
  }
}
