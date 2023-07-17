import { Dispatch, SetStateAction } from "react";
import { IPlace } from "./studyDetails";

export type StudyStatus = "pending" | "open" | "dismissed" | "free";

export interface IPlaceStatus {
  status?: StudyStatus;
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
