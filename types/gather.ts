import { Dayjs } from "dayjs";
import { IUser } from "./user";

export type GatherCategory = "전체" | "모집중" | "완료";

export type GatherType = { title: string; subtitle?: string };
export interface IGatherContent {
  type: GatherType;
  title: string;
  content: string;
  location: { main: string; sub?: string };
  date: Dayjs | string;
  createdAt?: string;
  updatedAt?: string;
  memberCnt: { min: number; max: number };
  age?: number[];
  preCnt?: number;
  genderCondition: boolean;
  participants: IUser[];
  password?: string;
  id: string;
  user: IUser;
  status?: "open" | "close" | "end" | "pending";
}
