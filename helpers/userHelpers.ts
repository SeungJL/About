import { BADGE_INFO } from "../constants/settingValue/badge";
import {
  EVENT_BADGE_딸기스무디,
  EVENT_BADGE_라벤더,
  EVENT_BADGE_민트초코,
} from "../constants/storage/eventBadgeUser";
import {
  IRankingUser,
  ISortedUserAttends,
  ISortedUserScores,
} from "../types/page/ranking";
import { IVoteRate } from "../types/study/study";
import { IScore } from "../types/user/pointSystem";
import { IUser, UserBadge } from "../types/user/user";

type DataArrMap = {
  score: IScore[];
  attend: IVoteRate[];
};

type SortUserScore = <T extends keyof DataArrMap>(
  scoreArr: DataArrMap[T],
  uid: string,
  type: T
) => void;

interface IUserBadge {
  badge: UserBadge;
  nextBadge: UserBadge;
}

export const getUserBadge = (score: number, uid: string): IUserBadge => {
  let badge: UserBadge;
  let nextBadge: UserBadge;
  if (EVENT_BADGE_딸기스무디.includes(uid)) badge = "딸기스무디";
  if (EVENT_BADGE_라벤더.includes(uid)) badge = "라벤더";
  if (EVENT_BADGE_민트초코.includes(uid)) badge = "민트초코";

  for (let i = 0; i < BADGE_INFO.length; i++) {
    let item = BADGE_INFO[i];
    if (score < item.minScore) {
      badge = badge ?? BADGE_INFO[i - 1]?.badge;
      nextBadge = item.badge;
      break;
    }
    if (i === BADGE_INFO.length - 1) {
      badge = badge ?? item.badge;
      nextBadge = null;
    }
  }

  return { badge, nextBadge };
};

export const myScoreRank = (scoreArr: IScore[], myScore: number) => {
  let highCnt = 0;
  const total = scoreArr.length;
  scoreArr.forEach((user) => {
    if (user.score >= myScore) highCnt++;
  });
  const rate = (highCnt / total) * 100;
  if (rate < 1) return 1;
  if (rate < 5) return 5;
  if (rate < 10) return 10;
  else return Math.ceil(rate / 10) * 10;
};
// scoreArr: IScore[] | IUser[] | IRankingUser[],
// uid: string,
// type: "score" | "attend"

//순위 백분율 반환
const setPercentRankValue = (rankNum: number, total: number) => {
  const rate = (rankNum / total) * 100;
  if (rate < 1) return 1;
  if (rate < 5) return 5;
  if (rate < 10) return 10;
  else return Math.ceil(rate / 10) * 10;
};

//유저 점수 랭킹 정렬
export const sortUserScores = (
  scoreArr: IScore[] | IUser[],
  uid: string
): ISortedUserScores => {
  let myScore = scoreArr.find((who) => who.uid === uid)?.score;

  const compare = (a: IScore, b: IScore) => {
    if (a.score > b.score) return -1;
    else if (a.score < b.score) return 1;
    return 0;
  };
  scoreArr.sort(compare);

  const rankNum = myScore
    ? scoreArr.findIndex((who) => who.score === myScore) + 1
    : 0;

  if (rankNum <= 100)
    return {
      scoreArr,
      rankValue: rankNum,
      isRankNum: true,
    };
  return {
    scoreArr,
    rankValue: setPercentRankValue(rankNum, scoreArr.length),
    isRankNum: false,
  };
};
//유저 월간 랭킹 정렬
export const sortUserAttends = (
  attendArr: IRankingUser[],
  uid: string
): ISortedUserAttends => {
  let myAttendCnt = attendArr.find((who) => who.uid === uid)?.cnt;

  const compare = (a: IRankingUser, b: IRankingUser) => {
    if (a.cnt > b.cnt) return -1;
    else if (a.cnt < b.cnt) return 1;
    return 0;
  };
  attendArr.sort(compare);

  //정보가 없는 경우 rankNum은 0을 반환
  const rankNum = myAttendCnt
    ? attendArr.findIndex((who) => who.cnt === myAttendCnt) + 1
    : 0;

  if (rankNum <= 100)
    return {
      attendArr,
      rankValue: rankNum,
      isRankNum: true,
    };
  return {
    attendArr,
    rankValue: setPercentRankValue(rankNum, attendArr.length),
    isRankNum: false,
  };
};

export const sortUserScore: SortUserScore = (scoreArr, uid, type) => {
  let myValue = null;

  const compareScore = (a: IScore, b: IScore) => {
    if (!myValue && a.uid === uid) myValue = a.score;
    if (a.score > b.score) return -1;
    else if (a.score < b.score) return 1;
    return 0;
  };

  const compareAttend = (a: IVoteRate, b: IVoteRate) => {
    if (!myValue && a.uid === uid) myValue = a.cnt;
    if (a.cnt > b.cnt) return -1;
    else if (a.cnt < b.cnt) return 1;
    return 0;
  };

  const total = scoreArr.length;
  let myRankNum = 0;
  let percent;

  if (type === "score") {
    (scoreArr as IScore[]).sort(compareScore);
    scoreArr.forEach((user) => {
      if (myValue !== null && user.score > myValue) myRankNum++;
    });

    if (myRankNum <= 100)
      return {
        scoreArr: scoreArr as IScore[],
        rankNum: myValue === 0 ? -1 : myRankNum,
        isRank: true,
        score: myValue,
      };
  }

  if (type === "attend") {
    (scoreArr as IVoteRate[]).sort(compareAttend);
    if (myValue !== 0)
      (scoreArr as IVoteRate[]).forEach((user) => {
        if (user.cnt > myValue) myRankNum++;
      });
    return {
      scoreArr: scoreArr as IVoteRate[],
      rankNum: myValue === 0 ? -1 : myRankNum,
      isRank: true,
      score: myValue,
    };
  }

  const rate = (myRankNum / total) * 100;
  if (rate < 1) percent = 1;
  if (rate < 5) percent = 5;
  if (rate < 10) percent = 10;
  else percent = Math.ceil(rate / 10) * 10;
  return {
    scoreArr,
    percent: myValue === 0 ? 100 : percent,
    isRank: false,
    score: myValue,
  };
};
