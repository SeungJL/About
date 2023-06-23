import { Dayjs } from "dayjs";
import { IUser } from "./user";
import { ITime } from "./utils";

export type GatherCategory = "전체" | "모집중" | "완료";

export type GatherType = { title: string; subtitle?: string };

export type GatherStatus = "open" | "close" | "end" | "pending";

export type GatherLocation = {
  main: string;
  sub?: string;
};
export interface IGatherContent {
  type: GatherType;
  title: string;
  content: string;
  location: GatherLocation;
  date: Dayjs | string;
  createdAt?: string;
  updatedAt?: string;
  memberCnt: { min: number; max: number };
  firstGather: { text: string; time: ITime };
  secondGather?: { text: string; time: ITime };
  age?: number[];
  preCnt?: number;
  genderCondition: boolean;
  participants: IUser[];
  password?: string;
  id: string;
  user: IUser;
  status?: GatherStatus;
}
