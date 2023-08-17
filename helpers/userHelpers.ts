import {
  EVENT_BADGE_딸기스무디,
  EVENT_BADGE_라벤더,
} from "../storage/eventBadgeUser";
import { IRankingUser, IRankScore } from "../types/page/ranking";
import { IVoteRate } from "../types/study/studyRecord";
import { IScore } from "../types/user/pointSystem";
import { IUser, UserBadge } from "../types/user/user";

export const getUserBadgeScore = (score: number, uid: string) => {
  let eventBadge: UserBadge = null;

  if (EVENT_BADGE_딸기스무디.includes(uid)) eventBadge = "딸기스무디";
  if (EVENT_BADGE_라벤더.includes(uid)) eventBadge = "라벤더";

  let badge: UserBadge = "아메리카노";
  let nextBadge: UserBadge = "라떼";
  let badgeScore = 0;
  let gap = 30;
  let nextScore = 30;
  if (score < 30) badgeScore = score;
  else if (score < 70) {
    (badge = "라떼"),
      (badgeScore = score - 30),
      (nextBadge = "마키아또"),
      (nextScore = 70);
    gap = 40;
  } else if (score < 120) {
    (badge = "마키아또"),
      (badgeScore = score - 70),
      (nextBadge = "콜드브루"),
      (nextScore = 120);
    gap = 50;
  } else if (score < 180) {
    (badge = "콜드브루"),
      (badgeScore = score - 120),
      (nextBadge = "아인슈페너"),
      (nextScore = 180);
    gap = 60;
  } else if (score < 250) {
    (badge = "아인슈페너"),
      (badgeScore = score - 180),
      (nextBadge = "모카"),
      (nextScore = 250);
    gap = 70;
  } else if (score < 330) {
    (badge = "모카"),
      (badgeScore = score - 250),
      (nextBadge = "에스프레소"),
      (nextScore = 330);
    gap = 80;
  } else if (score > 330) {
    (badge = "에스프레소"),
      (badgeScore = score - 330),
      (nextBadge = "에스프레소"),
      (nextScore = 70);
    gap = 100;
  }
  return { badge: eventBadge || badge, badgeScore, nextBadge, gap, nextScore };
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

export const sortUserScore = (
  scoreArr: IScore[] | IUser[] | IRankingUser[],
  uid: string,
  type: "score" | "attend"
): IRankScore => {
  let myValue = null;

  const compareAttend = (a: IVoteRate, b: IVoteRate) => {
    if (!myValue && a.uid === uid) myValue = a.cnt;
    if (a.cnt > b.cnt) return -1;
    else if (a.cnt < b.cnt) return 1;
    return 0;
  };
  const compareScore = (a: IScore, b: IScore) => {
    if (!myValue && a.uid === uid) {
      myValue = a.score;
    }

    if (a.score > b.score) return -1;
    else if (a.score < b.score) return 1;
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
        rankNum: myRankNum,
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
      rankNum: myRankNum,
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
