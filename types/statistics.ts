import dayjs, { Dayjs } from "dayjs";
import { Schema } from "mongoose";
import { IplaceInfo } from "../components/utils/placeSelector";
import { IPlace } from "./studyDetails";
import { IUser } from "./user";

import { ITimeStartToEndHM } from "./utils";

export interface IVoteStudyInfo {
  place?: IPlace;
  subPlace?: IPlace[];
  start: Dayjs;
  end: Dayjs;
}

export type IPlaceStatusType =
  | "pending"
  | "waiting_confirm"
  | "open"
  | "dismissed";

export interface IPlaceStatus {
  status?: "pending" | "waiting_confirm" | "open" | "dismissed";
}
export interface IUserStatisticAttendence extends Document {
  date: Date;
  time: string;
  place: string | IPlace;
  process: string;
  friends: string | IUser;
}

export interface IUserStatistic extends Document {
  attendences: IUserStatisticAttendence[];
  voteCnt4Week: number;
  openCnt4Week: number;
  voteCnt2Week: number;
  openCnt2Week: number;
  voteCnt1Week: number;
  openCnt1Week: number;
  _id?: any;
}
