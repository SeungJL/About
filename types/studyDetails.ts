import { Dayjs } from "dayjs";
import { Document } from "mongoose";
import { IPlaceStatus } from "./statistics";
import { Location } from "./system";
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

export interface IParticipation extends IPlaceStatus, ITimeStartToEndHM {
  place?: IPlace;
  attendences?: IAttendence[];
  absences?: IAbsence[];
  startTime?: Date;
  endTime?: Date;
}
export interface IVote extends Document {
  date: Date;
  participations: IParticipation[];
}

export interface IStudyStart {
  place_id: string;
  startTime: string;
}

export interface IAttendMessage {
  user: IUser;
  memo: string;
  arrived: string;
}

export interface IVoteInfo {
  place: IPlace;
  subPlace: IPlace[];
  start: Dayjs;
  end: Dayjs;
}

export interface ISpaceControl {
  branch?: string;
  latitude?: number;
  longitude?: number;
  brand?: string;
  location?: Location;
  status?: string;
  image?: string;
}
