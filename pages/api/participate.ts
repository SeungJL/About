import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../libs/dbConnect'
import UpdateParticipants from '../../models/interface/updateParticipants';
import ParticipationModel, {Participation} from "../../models/participationModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Participation>
) {
  const { method, query, body } = req
  const date = query['date'] as string

  if(date && dayjs(date, 'YYYY-MM-DD').isValid()) {
    res.status(400)
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      const participation = await ParticipationModel.findOne({ date }) as Participation
      res.status(200).json(participation)
      break
    case 'PATCH':
      const { operation, participant } = body as UpdateParticipants

      if (operation === 'append') {
        await ParticipationModel.updateOne({ date }, { $push: { participants: participant } })
      } else {
        await ParticipationModel.updateOne({ date }, { $pull: { participants: { name: participant.name } } })
      }
      res.status(200).json(await ParticipationModel.findOne({ date }) as Participation)
      break
    default:
      res.status(400)
      break
  }
}
