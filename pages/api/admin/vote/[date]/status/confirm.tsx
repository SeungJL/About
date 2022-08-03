import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../../../../libs/dbConnect"
import { dateToDayjs, strToDate } from "../../../../../../libs/utils/dateUtils"
import { getOptimalTime2, openable } from "../../../../../../libs/utils/timeUtils"
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

      vote.participations
        .flatMap((p) => p.attendences)
        .forEach((att) => {
          att.confirmed = true
        })
      vote.participations.forEach((participation) => {
        const participationTimes = participation.attendences.map((att) => att.time)

        if (openable(participationTimes)) {
          participation.status = 'open'
        } else {
          participation.status = 'dismissed'
        }
        const times = participation.attendences.map((p) => ({
          start: dateToDayjs(p.time.start),
          end: dateToDayjs(p.time.end),
        }))

        participation.time = getOptimalTime2(times).toDate()
      })

      await vote.save()
      return res.status(204).end()
  }

  return res.status(404).end()
}