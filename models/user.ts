import mongoose, {model, Schema, Document, Model} from 'mongoose'
import { IPlace } from './place'

export interface IUserStatisticAttendence extends Document {
  date: Date
  time: string
  place: string | IPlace
  process: string
  friends: string | IUser
}

const UserStatisticAttendenceSchema: Schema<IUserStatisticAttendence> = new Schema({
  date: Date,
  time: String,
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
  },
  process: String,
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { _id: false })

export interface IUserStatistic extends Document {
  attendences: IUserStatisticAttendence[]
  voteCnt4Week: number
  openCnt4Week: number
  voteCnt2Week: number
  openCnt2Week: number
  voteCnt1Week: number
  openCnt1Week: number
}

const UserStatisticShema: Schema<IUserStatistic> = new Schema({
  attendences: [UserStatisticAttendenceSchema],
  voteCnt4Week: {
    type: Number,
    default: 0
  },
  openCnt4Week: {
    type: Number,
    default: 0
  },
  voteCnt2Week: {
    type: Number,
    default: 0
  },
  openCnt2Week: {
    type: Number,
    default: 0
  },
  voteCnt1Week: {
    type: Number,
    default: 0
  },
  openCnt1Week: {
    type: Number,
    default: 0
  },
}, { _id: false })

export interface IUser extends Document {
  uid: string,
  status: string,
  name: string,
  email: string,
  thumbnailImage: string,
  profileImage: string,
  role: string,
  statistic: IUserStatistic
}

export const UserSchema: Schema<IUser> = new Schema({
  uid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'active',
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  thumbnailImage: {
    type: String,
    default: 'https://user-images.githubusercontent.com/48513798/173180642-8fc5948e-a437-45f3-91d0-3f0098a38195.png',
  },
  profileImage: {
    type: String,
    default: 'https://user-images.githubusercontent.com/48513798/173180642-8fc5948e-a437-45f3-91d0-3f0098a38195.png',
  },
  role: String,
  statistic: UserStatisticShema,
})

export const User = mongoose.models.User as Model<IUser, {}, {}, {}> || model<IUser>('User', UserSchema)
