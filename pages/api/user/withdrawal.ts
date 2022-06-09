import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { withdrawal } from '../../../libs/oauthUtils'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const token = await getToken({ req, secret })

  if (!token || !['member', 'previlige'].includes(token.role as string)) {
    res.status(401)
  }

  switch (method) {
    case 'DELETE':
      await withdrawal(token.accessToken as string)
      res.status(204).end()
      break
    default:
      res.status(400)
      break
  }
}
