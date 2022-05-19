import mongoose, {model, Schema, Document} from 'mongoose'

const ParticipantSchema: Schema<Participant> = new Schema({
  name: String,
  time: String,
}, { _id: false })

const ParticipationSchema: Schema<Participation> = new Schema({
  date: String,
  participants: [ParticipantSchema],
}, {
  timestamps: true,
})


export interface Participant {
  name: string,
  time: string,
}

export interface Participation extends Document {
  date: string,
  participants: Participant[],
}

export default mongoose.models.Participation || model<Participation>('Participation', ParticipationSchema)
