import { IUserBadge, UserBadge } from "../../types/user";

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
      (nextBadge = "마키아토"),
      (nextPoint = 70);
    gap = 40;
  } else if (score < 120) {
    (badge = "마키아토"),
      (badgePoint = score - 70),
      (nextBadge = "에스프레소"),
      (nextPoint = 120);
    gap = 50;
  } else if (score < 180) {
    (badge = "에스프레소"),
      (badgePoint = score - 120),
      (nextBadge = "모카"),
      (nextPoint = 180);
    gap = 60;
  } else if (score < 250) {
    (badge = "모카"),
      (badgePoint = score - 180),
      (nextBadge = "콜드브루"),
      (nextPoint = 250);
    gap = 70;
  } else if (score < 330) {
    (badge = "콜드브루"),
      (badgePoint = score - 250),
      (nextBadge = "아인슈페너"),
      (nextPoint = 330);
    gap = 80;
  } else if (score > 330) {
    (badge = "아인슈페너"),
      (badgePoint = score - 330),
      (nextBadge = "아인슈페너"),
      (nextPoint = 70);
    gap = 100;
  }

  return { badge, badgePoint, nextBadge, gap, nextPoint };
};
