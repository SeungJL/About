import mongoose, {model, Schema, Document, Model, Types} from 'mongoose'
import { IUser } from './user'


export interface IParticipant {
  user: string | IUser,
  time: string,
  place: string,
}

const ParticipantSchema: Schema<IParticipant> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  time: String,
  place: String,
}, { _id: false })


export interface IAttendence extends Document {
  date: Date,
  participants: IParticipant[],
  meetingTime: string,
  meetingPlace: string,
}

export const AttendenceSchema: Schema<IAttendence> = new Schema({
  date: Date,
  participants: [ParticipantSchema],
  meetingTime: {
    type: String,
    default: '',
  },
  meetingPlace: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
})

export const Attendence = mongoose.models.Attendence as Model<IAttendence, {}, {}, {}> || model<IAttendence>('Attendence', AttendenceSchema)
