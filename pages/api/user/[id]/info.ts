import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../libs/dbConnect';
import { getToken } from 'next-auth/jwt';
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

      res.status(200).json({ user, attendences: [] })
      break
    default:
      res.status(400).end()
      break
  }
}
