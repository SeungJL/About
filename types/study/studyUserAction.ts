import { Dayjs } from "dayjs";
import { IPlace } from "./study";

export interface IStudyPlaces {
  place: IPlace;
  subPlace?: IPlace[];
}

export interface IStudyParticipate extends IStudyPlaces {
  start: Dayjs;
  end: Dayjs;
}

