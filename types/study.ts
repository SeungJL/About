import { Dayjs } from "dayjs";
import { IPlace } from "./studyDetails";

export interface IStudyParticipate {
  place?: IPlace;
  subPlace?: IPlace[];
  start: Dayjs;
  end: Dayjs;
}
