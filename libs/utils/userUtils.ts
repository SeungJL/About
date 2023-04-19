import {
  IRankScore,
  IScore,
  IScoreAll,
  IUserBadge,
  UserBadge,
} from "../../types/user";

export const userBadgeScore = (score) => {
  let badge: UserBadge = "아메리카노";
  let nextBadge: UserBadge = "라떼";
  let badgePoint = 0;
  let gap = 30;
  let nextPoint = 30;

  if (score < 30) badgePoint = score;
  else if (score < 70) {
    (badge = "라떼"),
      (badgePoint = score - 30),
      (nextBadge = "마키아또"),
      (nextPoint = 70);
    gap = 40;
  } else if (score < 120) {
    (badge = "마키아또"),
      (badgePoint = score - 70),
      (nextBadge = "콜드브루"),
      (nextPoint = 120);
    gap = 50;
  } else if (score < 180) {
    (badge = "콜드브루"),
      (badgePoint = score - 120),
      (nextBadge = "아인슈페너"),
      (nextPoint = 180);
    gap = 60;
  } else if (score < 250) {
    (badge = "아인슈페너"),
      (badgePoint = score - 180),
      (nextBadge = "모카"),
      (nextPoint = 250);
    gap = 70;
  } else if (score < 330) {
    (badge = "모카"),
      (badgePoint = score - 250),
      (nextBadge = "에스프레소"),
      (nextPoint = 330);
    gap = 80;
  } else if (score > 330) {
    (badge = "에스프레소"),
      (badgePoint = score - 330),
      (nextBadge = "에스프레소"),
      (nextPoint = 70);
    gap = 100;
  }

  return { badge, badgePoint, nextBadge, gap, nextPoint };
};

const compare = (a: IScore, b: IScore) => {
  if (a.point > b.point) return -1;
  else if (a.point < b.point) return 1;
  return 0;
};

export const myScoreRank = (scoreArr: IScoreAll[], myScore: number) => {
  let highCnt = 0;
  const total = scoreArr.length;
  scoreArr.forEach((user) => {
    if (user.point >= myScore) highCnt++;
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
  scoreArr: IScoreAll[],
  myScore: number
): IRankScore => {
  scoreArr.sort(compare);
  const myRank = scoreArr.findIndex((who) => who._id) + 1;

  if (myRank <= 100) return { scoreArr, myRank, isRank: true };

  let highCnt = 0;
  const total = scoreArr.length;

  scoreArr.forEach((user) => {
    if (user.point >= myScore) highCnt++;
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
