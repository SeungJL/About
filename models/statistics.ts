import { Schema } from "mongoose";
import { IUserStatistic, IUserStatisticAttendence } from "../types/statistics";

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
export const UserStatisticShema: Schema<IUserStatistic> = new Schema(
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
