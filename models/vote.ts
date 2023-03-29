import mongoose, { model, Schema, Document, Model } from "mongoose";
import {
  IAbsence,
  IAgg,
  IAttendence,
  IAttendence2,
  IParticipant,
  IParticipantNote,
  IParticipation,
  IPlace,
  IRegularMeeting,
  IVote,
} from "../types/studyDetails";
import { ITimeStartToEnd } from "../types/utils";

const ParticipantTimeSchema: Schema<ITimeStartToEnd> = new Schema(
  {
    start: {
      type: Date,
      required: false,
    },
    end: {
      type: Date,
      required: false,
    },
  },
  { _id: false }
);

const ParticipantNoteSchema: Schema<IParticipantNote> = new Schema(
  {
    desc: Schema.Types.String,
    lunch: {
      type: Schema.Types.String,
      enum: ["attend", "absent", "no_select"],
      default: "no_select",
    },
    dinner: {
      type: Schema.Types.String,
      enum: ["attend", "absent", "no_select"],
      default: "no_select",
    },
    afterDinner: {
      type: Schema.Types.String,
      enum: ["attend", "absent", "no_select"],
      default: "no_select",
    },
  },
  { _id: false }
);

const AttendenceSchema: Schema<IAttendence> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    time: ParticipantTimeSchema,
    note: ParticipantNoteSchema,

    arrived: Date,

    firstChoice: {
      type: Schema.Types.Boolean,
      default: true,
    },
    memo: String,
  },
  { _id: false, timestamps: true, strict: false }
);

const AbsenceSchema: Schema<IAbsence> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    noShow: {
      type: Schema.Types.Boolean,
      default: false,
    },
    message: Schema.Types.String,
  },
  { _id: false, timestamps: true }
);

const ParticipationSchema: Schema<IParticipation> = new Schema(
  {
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },

    attendences: [AttendenceSchema],
    absences: [AbsenceSchema],
    startTime: Date,
    endTime: Date,

    status: {
      type: Schema.Types.String,
      enum: ["pending", "waiting_confirm", "open", "dismissed"],
      default: "pending",
    },
    showVote: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  { _id: false }
);

const RegularMeetingSchema: Schema<IRegularMeeting> = new Schema(
  {
    enable: {
      type: Schema.Types.Boolean,
      default: false,
    },
    place: Schema.Types.String,
    time: Date,
    description: Schema.Types.String,
  },
  { _id: false }
);

const AggSchema: Schema<IAgg> = new Schema(
  {
    voted: {
      type: [Schema.Types.String],
      default: [],
    },
  },
  { _id: false }
);

const VoteSchema: Schema<IVote> = new Schema({
  date: Date,
  participations: [ParticipationSchema],
  regularMeeting: RegularMeetingSchema,
  agg: AggSchema,
});

export const Vote =
  (mongoose.models.Vote as Model<IVote, {}, {}, {}>) ||
  model<IVote>("Vote", VoteSchema);
