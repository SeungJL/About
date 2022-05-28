import mongoose, {model, Schema, Document, Model} from 'mongoose'


export interface IParticipant {
  id: string,
  name: string,
  time: string,
  place: string,
  img: string,
}

const ParticipantSchema: Schema<IParticipant> = new Schema({
  id: String,
  name: String,
  time: String,
  place: String,
  img: String,
}, { _id: false })


export interface IAttendence extends Document {
  date: string,
  participants: IParticipant[],
  meetingTime: string,
}

export const AttendenceSchema: Schema<IAttendence> = new Schema({
  date: String,
  participants: [ParticipantSchema],
  meetingTime: String,
}, {
  timestamps: true,
})

export const Attendence = mongoose.models.Attendence as Model<IAttendence, {}, {}, {}> || model<IAttendence>('Attendence', AttendenceSchema)
