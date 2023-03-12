import dayjs, { Dayjs } from "dayjs";
import { IplaceInfo } from "../modals/study/vote/voteStudy/vote/placeSelector";
import { IPlace } from "../models/place";
import { ITimeStartToEnd } from "./utils";

export interface IVoteStudyInfo {
  place?: IPlace;
  subPlace?: IPlace[];
  start: Dayjs;
  end: Dayjs;
}

export interface IPlaceStatus {
  status: "pending" | "waiting_confirm" | "open" | "dismissed";
}
