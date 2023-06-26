import { Dayjs } from "dayjs";

export interface IApplyRest {
  type: "일반" | "특별";
  startDate: string | Dayjs;
  endDate: string | Dayjs;
  content: string;
}

export interface IAbsentInfo {
  message?: string;
  uid?: string;
}
