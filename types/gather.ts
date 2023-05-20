import { Dayjs } from "dayjs";
import { IUser } from "./user";

export type GatherCategory = "전체" | "모집중" | "완료";

export type GatherType = { title: string; subtitle?: string };
export interface IGatherContent {
  type: GatherType;
  title: string;
  content: string;
  location: { main: string; sub?: string };
  date: Dayjs;
  createdDate?: Dayjs;
  memberCnt: { min: number; max: number };
  age?: number[];
  preCnt?: number;
  genderCondition: boolean;
  password?: string;
  id: number;
  user: IUser;
  status?: "open" | "closed";
}


