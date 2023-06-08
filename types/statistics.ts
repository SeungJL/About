import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { IPlace } from "./studyDetails";

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

export type Status = "pending" | "waiting_confirm" | "open" | "dismissed";

export interface IPlaceStatus {
  status?: Status;
}
export interface IplaceInfo extends IPlaceStatus {
  placeName?: IPlace;
  voteCnt?: number;
}
export interface IPlaceSelecter {
  placeInfoArr: IplaceInfo[];
  firstPlace: IplaceInfo[];
  setSelectedPlace: Dispatch<SetStateAction<IplaceInfo[]>>;
  secondPlaces?: IplaceInfo[];
  isSelectUnit: boolean;
}
