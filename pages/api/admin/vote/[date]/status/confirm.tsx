import { NextApiRequest, NextApiResponse } from "next"
import { MAX_USER_PER_PLACE, MIN_USER_FOR_STUDY } from "../../../../../../constants/system"
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

      const sources = vote.participations.filter((participation) => {
        const attendenceCnt = participation.attendences.length
        const unconfirmedCnt = participation.attendences.filter((att) => !att.confirmed).length

        return attendenceCnt === 1 && unconfirmedCnt === 1
      })

      for (let i=0; i<sources.length; i++) {
        const sourceParticipation = sources[i]
        
        const sourcePlaceId = sourceParticipation.place.toString()
        const attendence = sourceParticipation.attendences[0]

        // 1명 장소 -> 2명 장소
        const targetParticipation1 = vote.participations
          .filter((p) => p.place.toString() !== sourcePlaceId)
          .find((p) => MIN_USER_FOR_STUDY-1 === p.attendences.length)

        if (targetParticipation1) {
          targetParticipation1.attendences.push(attendence)
          sourceParticipation.attendences = []

          break
        }

        // 1명 장소 -> 3명 이상 장소
        const targetParticipation2 = vote.participations
        .filter((p) => p.place.toString() !== sourcePlaceId)
        .find((p) => p.attendences.length < MAX_USER_PER_PLACE && openable([
          ...p.attendences.map((att) => att.time),
          attendence.time,
        ]))
        
        if (targetParticipation2) {
          console.log(attendence)
          targetParticipation2.attendences = [
            ...targetParticipation2.attendences,
            attendence,
          ]
          sourceParticipation.attendences = []

          break
        }
      }

      vote.participations
        .flatMap((p) => p.attendences)
        .forEach((att) => {
          att.confirmed = true
        })
      
      // 결과 확정 및 모임 날짜 확정
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