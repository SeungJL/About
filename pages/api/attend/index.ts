import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../libs/dbConnect'
import UpdateParticipants from '../../../models/interface/updateParticipants';
import { IAttendence, Attendence, IParticipant } from "../../../models/attendence";
import { useSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAttendence>
) {
  const session = getSession({ req })
  const { method, query, body } = req
  const date = query['date'] as string

  if(date && dayjs(date, 'YYYY-MM-DD').isValid()) {
    res.status(400)
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      const participation = await Attendence.findOne({ date }) as IAttendence
      res.status(200).json(participation)
      break
    case 'PATCH':
      const { operation, time } = body as UpdateParticipants

      const participant: IParticipant = {
        name: session?.user?.name || '',
        time: time || '',
      }

      if (operation === 'append') {
        await Attendence.updateOne({ date }, { $push: { participants: participant } })
      } else {
        await Attendence.updateOne({ date }, { $pull: { participants: { name: participant.name } } })
      }
      res.status(200).json(await Attendence.findOne({ date }) as IAttendence)
      break
    default:
      res.status(400)
      break
  }
}
