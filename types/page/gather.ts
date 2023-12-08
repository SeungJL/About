import { Dayjs } from "dayjs";
import { CombinedLocation } from "../../pages/gather/writing/condition";
import { LocationFilterType } from "../system";
import { ITime } from "../timeAndDate";
import { IUser } from "../user/user";

export interface IGather extends Omit<IGatherWriting, "date"> {
  date: string;
  createdAt?: string;
  updatedAt?: string;
  participants: IGatherParticipants[];
  id: number;
  status?: GatherStatus;
  comment: IGatherComment[];
}

export interface IGatherWriting {
  type: IGatherType;
  place: LocationFilterType | CombinedLocation;
  genderCondition: boolean;
  title: string;
  content: string;
  gatherList: IGatherListItem[];
  date: Dayjs;
  location: IGatherLocation;
  memberCnt: IGatherMemberCnt;
  password?: string;
  age: number[];
  preCnt?: number;
  user: IUser;
  isAdminOpen?: boolean;
  image?: string;
}

export type GatherCategory = "전체" | "모집중" | "완료";
export type IGatherType = { title: string; subtitle?: string };
export type GatherStatus = "open" | "close" | "end" | "pending";

export type IGatherLocation = {
  main: string;
  sub: string;
};

export type IGatherMemberCnt = {
  min: number;
  max: number;
};

export type ParticipationPhase = "all" | "first" | "second";

export interface IGatherListItem {
  text: string;
  time: ITime;
}
export interface IGatherParticipants {
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
