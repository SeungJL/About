import { IRankScore, UserBadge } from "../../types/user";
import { IScore } from "../../types/user/pointSystem";

export const getUserBadgeScore = (score) => {
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

  return { badge, badgeScore, nextBadge, gap, nextScore };
};

const compare = (a: IScore, b: IScore) => {
  if (a.score > b.score) return -1;
  else if (a.score < b.score) return 1;
  return 0;
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
  else {
    return Math.ceil(rate / 10) * 10;
  }
};

export const SortUserScore = (
  scoreArr: IScore[],
  myScore: number
): IRankScore => {
  scoreArr.sort(compare);

  const rankNum = scoreArr.findIndex((who) => who.score < myScore);
  if (rankNum <= 100) return { scoreArr, rankNum, isRank: true };
  let highCnt = 0;
  const total = scoreArr.length;

  scoreArr.forEach((user) => {
    if (user.score >= myScore) highCnt++;
  });

  let percent;
  const rate = (highCnt / total) * 100;
  if (rate < 1) percent = 1;
  if (rate < 5) percent = 5;
  if (rate < 10) percent = 10;
  else {
    percent = Math.ceil(rate / 10) * 10;
  }
  return { scoreArr, percent, isRank: false };
};
