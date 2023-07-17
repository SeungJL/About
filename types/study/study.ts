import { Dayjs } from "dayjs";
import { Document } from "mongoose";

import { IDayjsStartToEnd, ITimeStartToEnd } from "../timeAndDate";
import { IUser } from "../user/user";

export interface IVote extends Document {
  date: Date;
  participations: IParticipation[];
}

export interface IParticipation extends ITimeStartToEnd {
  place: IPlace;
  attendences: IAttendance[];
  absences: IAbsence[];
  startTime?: Date;
  endTime?: Date;
  status: StudyStatus;
}

export interface IAttendance {
  user: IUser;
  time: IDayjsStartToEnd;
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
  latitude: number;
  longitude: number;
  priority?: number;
  _id: string;
  location: string;
}

export interface IAbsence {
  user: string | IUser;
  noShow: boolean;
  message: string;
}

export type StudyStatus = "pending" | "open" | "dismissed" | "free";

export interface IStudyStartTime {
  placeId: string;
  startTime: Dayjs;
}

export type StudyDate = "passed" | "today" | "not passed";
