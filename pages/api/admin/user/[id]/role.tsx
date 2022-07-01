import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import dbConnect from "../../../../../libs/dbConnect"
import { User } from "../../../../../models/user"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const uid = req.query.id as string
  const { method } = req
  const role = req.body.role as string
  const token = await getToken({ req, secret })

  // if (!token || !isPreviliged(token.role as string)) {
  //   res.status(401).end()
  //   return
  // }

  await dbConnect()

  switch (method) {
    case 'PATCH':
      await User.updateOne({status: 'active', uid: uid}, {$set: {
        role: role,
      }})
      res.status(204).end()
      break
    default:
      res.status(400).end()
      break
  }
}
