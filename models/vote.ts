import mongoose, { Document, Model, model, Schema } from "mongoose";
import { IPlace } from "./place";
import { IUser } from "./user";

export interface IParticipantTime {
  start?: Date;
  end?: Date;
}

export interface IParticipantNote {
  desc: string;
  lunch: "attend" | "absent" | "no_select";
  dinner: "attend" | "absent" | "no_select";
  afterDinner: "attend" | "absent" | "no_select";
}

export interface IAttendence {
  user: string | IUser;
  time: IParticipantTime;
  note: IParticipantNote;
  confirmed: boolean;
  anonymity: boolean;
  created: Date;
  arrived?: Date;
}

export interface IInvitation {
  user: string | IUser;
  invitor: string | IUser;
}

export interface IAbsence {
  user: string | IUser;
  noShow: boolean;
  message: string;
}

export interface IParticipation {
  place: string | IPlace;
  time?: Date;
  attendences: IAttendence[];
  absences: IAbsence[];
  invitations: IInvitation[];
  status: "pending" | "waiting_confirm" | "open" | "dismissed";
  showVote?: boolean;
  desc: string;
  index: Number;
}

export interface IRegularMeeting {
  enable: boolean;
  place?: string;
  time?: Date;
  description?: string;
}

export interface IAgg {
  voted: string[] | IUser[];
  invited: string[] | IUser[];
  cancelled: string[] | IUser[];
}

export interface IVote extends Document {
  date: Date;
  participations: IParticipation[];
  regularMeeting: boolean;
  agg: IAgg;
}

const ParticipantTimeSchema: Schema<IParticipantTime> = new Schema(
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
    confirmed: {
      type: Schema.Types.Boolean,
      default: false,
    },
    arrived: Date,
    anonymity: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { _id: false, timestamps: true }
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

const InvitationSchema: Schema<IInvitation> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    invitor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false, timestamps: true }
);

const ParticipationSchema: Schema<IParticipation> = new Schema(
  {
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
    time: Date,
    attendences: [AttendenceSchema],
    absences: [AbsenceSchema],
    invitations: [InvitationSchema],
    status: {
      type: Schema.Types.String,
      enum: ["pending", "waiting_confirm", "open", "dismissed"],
      default: "pending",
    },
    showVote: {
      type: Schema.Types.Boolean,
      default: true,
    },
    desc: {
      type: Schema.Types.String,
      default: "",
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
