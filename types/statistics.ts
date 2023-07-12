import { Dispatch, SetStateAction } from "react";
import { IPlace } from "./studyDetails";

export type IPlaceStatusType =
  | "pending"
  | "waiting_confirm"
  | "open"
  | "dismissed"
  | "free";

export type Status =
  | "pending"
  | "waiting_confirm"
  | "open"
  | "dismissed"
  | "free";

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
