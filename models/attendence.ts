import { IAttendence2, IParticipant } from "../types/studyDetails";
import mongoose, { model, Schema, Document, Model } from "mongoose";

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
export const AttendenceSchema: Schema<IAttendence2> = new Schema(
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
  (mongoose.models.Attendence as Model<IAttendence2, {}, {}, {}>) ||
  model<IAttendence2>("Attendence", AttendenceSchema);
