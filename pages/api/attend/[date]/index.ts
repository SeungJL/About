import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../libs/dbConnect';
import UpdateParticipants from '../../../../models/interface/updateParticipants';
import { IAttendence, Attendence } from '../../../../models/attendence';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAttendence>
) {
  const date = req.query.date as string
  const { method, body } = req

  if(date && !dayjs(date, 'YYYY-MM-DD').isValid()) {
    res.status(400)
  }

  await dbConnect()

  switch (method) {
    case 'POST':
      const newAttendence = new Attendence({
        date,
        participant: [],
      })

      const savedAttendence = await newAttendence.save()

      res.status(201).json(savedAttendence)
      break
    case 'GET':
      await Attendence.findOne({ date })
      break
    case 'PATCH':
      const { operation, participant } = body as UpdateParticipants

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
