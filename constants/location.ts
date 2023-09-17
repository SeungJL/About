import { Location } from "../types/system";

export const STUDY_LOCATION: Location[] = [
  "수원",
  "양천",
  "안양",
  "강남",
  "동대문",
];

export const LOCATION_ALL: Location[] = [
  "수원",
  "양천",
  "안양",
  "강남",
  "보류",
];

export const LOCATION_PLACE_SMALL: Location[] = ["안양"];

export const LOCATION_OPEN_DATE = {
  수원: "2023-04-07",
  양천: "2023-04-19",
  안양: "2023-09-01",
  강남: "2023-09-04",
};

export const NOT_OPEN_LOCATION = ["동대문"];

export const RegisterLocation = [...STUDY_LOCATION, "보류"];
