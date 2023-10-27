import { ITimeStamps } from "../timeAndDate";
import { IUserIdentity } from "./user";

export type Alphabet = "A" | "B" | "O" | "U" | "T";

export interface ICollectionAlphabet extends IUserIdentity, ITimeStamps {
  collects: Alphabet[];
  collectCnt: number;
}
