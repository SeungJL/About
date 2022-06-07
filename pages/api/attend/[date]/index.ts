import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../libs/dbConnect';
import UpdateParticipants from '../../../../models/interface/updateParticipants';
import { IAttendence, Attendence, IParticipant } from '../../../../models/attendence';
import { getToken } from 'next-auth/jwt';
import { getInterestingDate, strToDate } from '../../../../libs/dateUtils';

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAttendence>
) {
  const dateStr = req.query.date as string
  const { method, body } = req
  const token = await getToken({ req, secret })

  if (!token) {
    res.status(401)
  }

  if(dateStr && !dayjs(dateStr, 'YYYY-MM-DD').isValid()) {
    res.status(400)
  }
  const date = strToDate(dateStr)

  await dbConnect()

  switch (method) {
    case 'POST':
      const newAttendence = new Attendence({
        date: date,
        participant: [],
      })

      const savedAttendence = await newAttendence.save()

      res.status(201).json(savedAttendence)
      break
    case 'GET':
      await Attendence.findOne({ date })
      break
    case 'PATCH':
      const isActivated = getInterestingDate() <= date
      if (!isActivated) res.status(400)

      const { operation, time, place } = body as UpdateParticipants

      const participant: IParticipant = {
        user: token.id as string,
        time: time || '',
        place: place || '',
      }

      switch (operation) {
        case 'append':
          const isExisting = await Attendence.findOne({date: date, participants: {$elemMatch: {user: participant.user}}})
          if (isExisting) {
            break
          }
          await Attendence.updateOne({ date: date }, { $push: { participants: participant } })
          break
        case 'delete':
          await Attendence.updateOne({ date: date }, { $pull: { participants: {user: participant.user}} })
          break
        case 'time_update':
          await Attendence.updateOne({ date: date, "participants.user": participant.user }, {'participants.$.time': time})
          break
        case 'place_update':
          await Attendence.updateOne({ date: date, "participants.user": participant.user }, {'participants.$.place': place})
          break
      }
      res.status(200).json(await Attendence.findOne({ date: date }).populate('participants.user') as IAttendence)
      break
    default:
      res.status(400)
      break
  }
}
