import { Dayjs } from "dayjs";
import { IPlace } from "./studyDetails";

export interface IStudyPlaces {
  place: IPlace;
  subPlace?: IPlace[];
}

export interface IStudyParticipate extends IStudyPlaces {
  start: Dayjs;
  end: Dayjs;
}
