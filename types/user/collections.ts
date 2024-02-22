import { IUserSummary } from "../../types2/userTypes/userInfoTypes";
import { ITimeStamps } from "../timeAndDate";

export type Alphabet = "A" | "B" | "O" | "U" | "T";

export interface ICollectionAlphabet extends ITimeStamps {
  collects: Alphabet[];
  collectCnt: number;
  user: IUserSummary;
}
