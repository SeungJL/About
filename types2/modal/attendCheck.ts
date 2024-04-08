import { ITimeStamps } from "../timeAndDate";

export interface IattendCheckPresent {
  item: string;
  percent: number;
}

export interface IDailyCheck extends ITimeStamps {
  uid: string;
  name: string;
}
