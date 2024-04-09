import { ITimeStamps } from "../../utils/timeAndDate";

export interface IattendCheckPresent {
  item: string;
  percent: number;
}

export interface IDailyCheck extends ITimeStamps {
  uid: string;
  name: string;
}
