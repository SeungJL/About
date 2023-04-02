import { Dayjs } from "dayjs";
import { IPlace } from "./studyDetails";
import { IUser } from "./user";

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
