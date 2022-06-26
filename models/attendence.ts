import mongoose, {model, Schema, Document, Model, Types} from 'mongoose'
import { IPlace, PlaceSchema } from './place'
import { IUser } from './user'


export interface IParticipant {
  user: string | IUser,
  time: string,
  place: string | IPlace,
}

const ParticipantSchema: Schema<IParticipant> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  time: String,
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
  },
}, { _id: false })


export interface IAttendence extends Document {
  date: Date,
  participants: IParticipant[],
  meetingTime: string,
  meetingPlace: string | IPlace,
}

export const AttendenceSchema: Schema<IAttendence> = new Schema({
  date: Date,
  participants: [ParticipantSchema],
  meetingTime: {
    type: String,
    default: '',
  },
  meetingPlace: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
  },
}, {
  timestamps: true,
})

export const Attendence = mongoose.models.Attendence as Model<IAttendence, {}, {}, {}> || model<IAttendence>('Attendence', AttendenceSchema)
