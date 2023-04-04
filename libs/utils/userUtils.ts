import { IUserBadge } from "../../types/user";

export const userBadgeScore = (score) => {
  let badge: IUserBadge = "아메리카노";
  let badgePoint = 0;

  if (score < 30) badgePoint = score;
  else if (score < 70) {
    (badge = "라떼"), (badgePoint = score - 30);
  } else if (score < 120) {
    (badge = "마키아토"), (badgePoint = score - 70);
  } else if (score < 180) {
    (badge = "에스프레소"), (badgePoint = score - 120);
  } else if (score < 250) {
    (badge = "모카"), (badgePoint = score - 180);
  } else if (score < 330) {
    (badge = "콜드브루"), (badgePoint = score - 250);
  } else if (score > 330) {
    (badge = "아인슈페너"), (badgePoint = score - 330);
  }

  return { badge, badgePoint };
};
