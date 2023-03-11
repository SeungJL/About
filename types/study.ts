import { IPlace } from "../models/place";
import { ITimeStartToEnd } from "./utils";

export interface IVoteStudyInfo extends ITimeStartToEnd {
  place: any;
  subPlace: any;
}

export interface IPlaceStatus {
  status: "pending" | "waiting_confirm" | "open" | "dismissed";
}
