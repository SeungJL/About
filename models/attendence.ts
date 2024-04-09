import mongoose, { model, Model, Schema } from "mongoose";
import { IPlace } from "../types/models/studyTypes/studyVoteTypes";
import { IUser } from "../types/models/userTypes/userInfoTypes";

export interface IAttendance2 extends Document {
  date: Date;
  participants: IParticipant[];
  meetingTime: string;
  meetingPlace: string | IPlace;
  process: string;
  firstChoice?: boolean;
}

export interface IParticipant {
  user: IUser;
  time?: string;
  place?: IPlace;
}

const ParticipantSchema: Schema<IParticipant> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    time: String,
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
  },
  { _id: false }
);
export const AttendenceSchema: Schema<IAttendance2> = new Schema(
  {
    date: Date,
    participants: [ParticipantSchema],
    meetingTime: {
      type: String,
      default: "",
    },
    meetingPlace: {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
    process: {
      type: String,
      enum: ["pending", "dismiss", "open"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
export const Attendence =
  (mongoose.models.Attendence as Model<IAttendance2, {}, {}, {}>) ||
  model<IAttendance2>("Attendence", AttendenceSchema);
