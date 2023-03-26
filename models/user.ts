import mongoose, { model, Schema, Document, Model } from "mongoose";
import { IPlace } from "./place";

export interface IUserComment {
  comment: string;
  _id: string;
}

export interface IUserStatisticAttendence extends Document {
  date: Date;
  time: string;
  place: string | IPlace;
  process: string;
  friends: string | IUser;
}

const UserStatisticAttendenceSchema: Schema<IUserStatisticAttendence> =
  new Schema(
    {
      date: Date,
      time: String,
      place: {
        type: Schema.Types.ObjectId,
        ref: "Place",
      },
      process: String,
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    { _id: false }
  );

export interface IUserStatistic extends Document {
  attendences: IUserStatisticAttendence[];
  voteCnt4Week: number;
  openCnt4Week: number;
  voteCnt2Week: number;
  openCnt2Week: number;
  voteCnt1Week: number;
  openCnt1Week: number;
}

const UserStatisticShema: Schema<IUserStatistic> = new Schema(
  {
    attendences: [UserStatisticAttendenceSchema],
    voteCnt4Week: {
      type: Number,
      default: 0,
    },
    openCnt4Week: {
      type: Number,
      default: 0,
    },
    voteCnt2Week: {
      type: Number,
      default: 0,
    },
    openCnt2Week: {
      type: Number,
      default: 0,
    },
    voteCnt1Week: {
      type: Number,
      default: 0,
    },
    openCnt1Week: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

export interface IUserBasic {
  name: string;
  image: string;
}

export interface IUser extends Document {
  uid: string;
  registerDate: string;
  isActive?: boolean;
  birth: string;
  mbti: string;
  gender: string;
  name: string;
  
  profileImage: string;
  role?: string;
  statistic: IUserStatistic;
  score: number;
  comment: string;
}

export const UserSchema: Schema<IUser> = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  registerDate: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  birth: {
    type: String,
    default: "",
  },
  mbti: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  
  profileImage: {
    type: String,
    default:
      "https://user-images.githubusercontent.com/48513798/173180642-8fc5948e-a437-45f3-91d0-3f0098a38195.png",
  },
  role: String,
  statistic: UserStatisticShema,
  score: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: "안녕하세요! 잘 부탁드립니다~!",
  },
});

export const User =
  (mongoose.models.User as Model<IUser, {}, {}, {}>) ||
  model<IUser>("User", UserSchema);
