import { Dayjs } from "dayjs";
import { IPlace } from "./studyDetail";

import { IUserSummary } from "../userTypes/userInfoTypes";

/** arrived */
export interface IArrivedInfo {
  uid: string;
  name: string;
}

export interface IArrivedInfoList {
  placeId: string;
  arrivedInfo: IArrivedInfo[];
}

export interface IArrivedData {
  date: number;
  arrivedInfoList: IArrivedInfoList[];
}

export interface IVoteRate {
  uid: string;
  cnt: number;
  userSummary?: IUserSummary;
}

export interface IAbsentInfo {
  message?: string;
  uid?: string;
}

export interface IStudyPlaces {
  place: IPlace;
  subPlace?: IPlace[];
}

export interface IStudyParticipate extends IStudyPlaces {
  start: Dayjs;
  end: Dayjs;
  memo?: string;
}
