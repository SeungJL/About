import { Dayjs } from "dayjs";
import { LocationFilterType } from "../system";
import { ITime } from "../timeAndDate";
import { IUser } from "../user/user";

export interface IGather extends Omit<IGatherWriting, "date"> {
  place: LocationFilterType;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  genderCondition: boolean;
  participants: GatherParticipants[];
  id: number;
  user: IUser;
  status?: GatherStatus;
  comment: IGatherComment[];
}

export interface IGatherWriting {
  type: GatherType;
  title: string;
  content: string;
  gatherList: GatherListItem[];
  date: Dayjs;
  location: GatherLocation;
  memberCnt: GatherMemberCnt;
  password?: string;
  age?: number[];
  preCnt?: number;
}

export type GatherCategory = "전체" | "모집중" | "완료";
export type GatherType = { title: string; subtitle?: string };
export type GatherStatus = "open" | "close" | "end" | "pending";

export type GatherLocation = {
  main: string;
  sub?: string;
};

export type GatherMemberCnt = {
  min: number;
  max: number;
};

export type ParticipationPhase = "all" | "first" | "second";

export interface GatherListItem {
  text: string;
  time: ITime;
}
export interface GatherParticipants {
  user: IUser;
  phase: ParticipationPhase;
}
export interface IGatherComment {
  user: IUser;
  comment: string;
  creadtedAt?: string;
  updatedAt?: string;
  _id: string;
}

export interface IGatherHeader {
  title: string;
  date: Dayjs | string | "미정";
  locationMain: string;
}
