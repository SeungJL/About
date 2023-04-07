import { Dayjs } from "dayjs";
import { IPlace } from "./studyDetails";
import { Dispatch, SetStateAction } from "react";
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
