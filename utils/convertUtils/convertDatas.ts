import {
  EVENT_BADGE_딸기스무디,
  EVENT_BADGE_라벤더,
  EVENT_BADGE_민트초코,
  MANAGER_BADGE,
} from "../../constants/storage/eventBadgeUser";
import {
  enToKrMapping,
  krToEnMapping,
} from "../../constants2/locationConstants";
import {
  BADGE_SCORE_MAPPINGS,
  USER_SCORE_BADGE_ARR,
} from "../../constants2/serviceConstants/badgeConstants";
import {
  ActiveLocation,
  LocationEn,
} from "../../types2/serviceTypes/locationTypes";
import { UserBadge, UserRole } from "../../types2/userTypes/userInfoTypes";

export const getUserBadge = (score: number, uid: string): UserBadge => {
  let badge: UserBadge = "아메리카노";

  // for (const [badgeName, badgeArray] of Object.entries(EVENT_BADGE_USER_LIST)) {
  //   if (badgeArray.includes(uid)) {
  //     return { badge: badgeName as UserBadge };
  //   }
  // }

  if (MANAGER_BADGE.includes(uid)) return "바닐라";
  if (EVENT_BADGE_라벤더.includes(uid)) return "라벤더";
  else if (EVENT_BADGE_딸기스무디.includes(uid)) return "딸기스무디";
  else if (EVENT_BADGE_민트초코.includes(uid)) return "민트초코";

  for (const [badgeName, minScore] of Object.entries(BADGE_SCORE_MAPPINGS)) {
    if (score < minScore) {
      return badge;
    }
    badge = badgeName as UserBadge;
  }

  return badge;

  //   for (let i = 0; i < USER_SCORE_BADGE_ARR.length; i++) {
  //     let item = BADGE_INFO[i];
  //     if (score < item.minScore) {
  //       badge = badge ?? BADGE_INFO[i - 1]?.badge;
  //       nextBadge = item.badge;
  //       break;
  //     }
  //     if (i === BADGE_INFO.length - 1) {
  //       badge = badge ?? item.badge;
  //       nextBadge = null;
  //     }
  //   }

  //   return { badge };
};

export const getNextBadge = (currentBadge: UserBadge): string | null => {
  const idx = USER_SCORE_BADGE_ARR.indexOf(
    currentBadge as typeof USER_SCORE_BADGE_ARR[number]
  );
  if (idx === -1 || idx === USER_SCORE_BADGE_ARR.length - 1) {
    return null;
  } else if (idx < USER_SCORE_BADGE_ARR.length - 1) {
    return USER_SCORE_BADGE_ARR[idx + 1];
  }
};

type ReturnLocationLang<T> = T extends "kr" ? ActiveLocation : LocationEn;

export const convertLocationLangTo = <T extends "kr" | "en">(
  location: ActiveLocation | LocationEn,
  to: T
): ReturnLocationLang<T> => {
  if (to === "kr") {
    return enToKrMapping[location as LocationEn] as ReturnLocationLang<T>;
  }
  if (to === "en") {
    return krToEnMapping[location as ActiveLocation] as ReturnLocationLang<T>;
  }

  throw new Error("Invalid 'to' parameter or location type");
};

export const getUserRole = (role: UserRole) => {
  switch (role) {
    case "human":
      return "수습 멤버";
    case "member":
      return "동아리원";
    case "manager":
      return "운영진";
    case "previliged":
      return "운영진";
    case "resting":
      return "휴식 멤버";
    case "enthusiastic":
      return "열활 멤버";
  }
};
