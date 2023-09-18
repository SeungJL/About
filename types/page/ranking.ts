import { IVoteRate } from "../study/studyRecord";
import { IScore } from "../user/pointSystem";
import { IUser } from "../user/user";

export interface IRankScore {
  isRank: boolean;
  rankNum?: number;
  percent?: number;
  scoreArr?: IScore[] | IVoteRate[];
  score?: number;
}

export interface ISortedUserScores {
  scoreArr: IScore[];
  rankValue: number;
  isRankNum: boolean;
}

export type RankingType = "score" | "attend";

export type RankingCategory = "월간" | "누적" | "지난";

export interface IRankingUser extends IUser {
  cnt: number;
}
