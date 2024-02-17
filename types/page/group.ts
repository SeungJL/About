import { GROUP_STUDY_CATEGORY_ARR } from "../../constants/contents/GroupStudyContents";
import { LocationFilterType } from "../system";
import { ITimeStamps } from "../timeAndDate";
import { IUser } from "../user/user";
import { GatherStatus, IGatherComment } from "./gather";

export type GroupCategory = typeof GROUP_STUDY_CATEGORY_ARR[number];



export interface IGroup extends IGroupWriting {
  createdAt: string;
  participants: { user: IUser; role: "member" | "manager" | "admin" }[];
  comment: IGatherComment[];
  link?: string;
}

export interface IGroupWriting extends ITimeStamps {
  category: IGroupWritingCategory;
  challenge?: string;
  title: string;
  content: string;
  rules: string[];
  status: GatherStatus;
  guide: string;
  feeText: string;
  image?: string;
  fee: number;
  gender: boolean;
  isFree: boolean;
  age: number[];
  password: string;
  period: string;
  organizer: IUser;
  location: LocationFilterType;

  questionText?: string;
  hashTag?: string;
  attendance: IGroupAttendance;
  waiting: {
    user: IUser;
    answer?: string;
    pointType: "point" | "deposit";
  }[];
  memberCnt: {
    min: number;
    max: number;
  };
  id: number;
}

export interface IGroupWritingCategory {
  main: string;
  sub: string;
}
export interface IWeekRecord {
  uid: string;
  name: string;
  attendRecord: string[];
  attendRecordSub?: string[];
}
export interface IGroupAttendance {
  firstDate: string;
  lastWeek: IWeekRecord[];
  thisWeek: IWeekRecord[];
}
