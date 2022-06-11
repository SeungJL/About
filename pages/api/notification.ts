import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { getInterestingDate } from '../../libs/dateUtils'
import { sendResultMessages } from '../../libs/oauthUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  return  // deprecated

  switch (method) {
    case 'POST':
      await sendResultMessages(getInterestingDate())
      res.status(204).end()
      break
    default:
      res.status(400)
      break
  }
}
