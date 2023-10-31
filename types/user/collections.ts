import { ITimeStamps } from "../timeAndDate";
import { IUser } from "./user";

export type Alphabet = "A" | "B" | "O" | "U" | "T";

export interface ICollectionAlphabet extends ITimeStamps {
  collects: Alphabet[];
  collectCnt: number;
  user: IUser;
}
