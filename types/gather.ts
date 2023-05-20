import { Dayjs } from "dayjs";

export type GatherCategory = "전체" | "모집중" | "완료";

export interface IGatherContent {
  type?: GatherType;
  title?: string;
  content?: string;
  location?: { main: string; sub?: string };
  date?: Dayjs;
  memberCnt?: { min: number; max: number };
  age?: number[];
  preCnt?: number;
  genderCondition?: boolean;
  password?: string;
}

export type GatherType = { title: string; subtitle?: string };
