import mongoose, { model, Schema, Document, Model } from "mongoose";
import { IPlaceStatus } from "./statistics";
import { IUser } from "./user";
import { ITimeStartToEnd, ITimeStartToEndHM } from "./utils";

export interface IParticipant {
  user: string | IUser;
  time?: string;
  place?: string | IPlace;
}

export interface IAttendence2 extends Document {
  date: Date;
  participants: IParticipant[];
  meetingTime: string;
  meetingPlace: string | IPlace;
  process: string;
  firstChoice?: boolean;
}

export interface IAttendence {
  user: string | IUser;
  time: ITimeStartToEnd;
  note: IParticipantNote;
  created: Date;
  arrived?: Date;
  firstChoice: boolean;
  confirmed: boolean;
  memo: string;
}

export interface IPlace {
  status: string;
  fullname: string;
  brand?: string;
  branch?: string;
  image?: string;
  color?: string;
  latitude: number;
  longitude: number;
  priority?: number;
  _id: string;
}

export interface IAbsence {
  user: string | IUser;
  noShow: boolean;
  message: string;
}

export interface IParticipation extends IPlaceStatus, ITimeStartToEndHM {
  place?: IPlace;
  attendences?: IAttendence[];
  absences?: IAbsence[];
  startTime?: Date;
  endTime?: Date;
  showVote?: boolean;
}
export interface IVote extends Document {
  date: Date;
  participations: IParticipation[];
  regularMeeting: boolean;
  agg: IAgg;
}

export interface IParticipantNote {
  desc: string;
  lunch: "attend" | "absent" | "no_select";
  dinner: "attend" | "absent" | "no_select";
  afterDinner: "attend" | "absent" | "no_select";
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
