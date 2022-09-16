import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import dbConnect from "../../../../libs/dbConnect"
import { dateToDayjs, now, strToDate } from "../../../../libs/utils/dateUtils"
import { IVote, Vote } from "../../../../models/vote"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVote>,
) {
  const { method } = req
  const dateStr = req.query.date as string
  const dayjsDate = strToDate(dateStr)
  const date = dayjsDate.toDate()

  const token = await getToken({ req, secret })
  const _id = token.id

  await dbConnect()

  const vote = await Vote.findOne({ date })
  if (!vote) return res.status(404).end()

  switch (method) {
    case 'PATCH':
      const currentTime = now()

      vote.participations.forEach((participation) => {
        participation.attendences.forEach((att) => {
          if (att.user.toString() === _id.toString()) {
            const { start, end } = att.time

            const startable = dateToDayjs(start).subtract(2, 'hour')
            const endable = dateToDayjs(end)

            if (startable <= currentTime && currentTime <= endable) {
              att.arrived = currentTime.toDate()
            } else {
              return res.status(400).end()
            }
          }
        })
      })

      await vote.save()
      return res.status(204).end()
    }

  return res.status(400).end()
}
