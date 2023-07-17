import { IScore } from "../user/pointSystem";

export interface IRankScore {
  isRank: boolean;
  rankNum?: number;
  percent?: number;
  scoreArr?: IScore[];
}
