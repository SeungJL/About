import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import dbConnect from "../../../../../libs/dbConnect"
import { strToDate } from "../../../../../libs/utils/dateUtils"
import { IAbsence, IVote, Vote } from "../../../../../models/vote"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVote>,
) {
  const { method } = req
  const dateStr = req.query.date as string
  const date = strToDate(dateStr).toDate()

  const token = await getToken({ req, secret })
  const _id = token.id

  await dbConnect()

  const vote = await Vote.findOne({ date })
  if (!vote) return res.status(404).end()
  
  const targetAtt = vote.participations.flatMap((p) => p.attendences).find((att) => att.user == _id)
  
  // 확정하지 않은 경우 불참 처리가 아니라 참여취소처리해야함
  if (!targetAtt || !targetAtt.confirmed) {
    return res.status(400).end()
  }

  switch (method) {
    case 'PATCH':
      vote.participations.forEach((participation) => {
        const isTargetParticipation = !!participation.attendences.find((att) => att.user == _id)
        if (isTargetParticipation) {
          participation.attendences = participation.attendences.filter((att) => att.user != _id)
          participation.absences = [...participation.absences, { user: _id, message: '' } as IAbsence]
        }
      })

      await vote.save()
      return res.status(204).end()
    }
    

  return res.status(400).end()
}
