import { UserBadge } from "../../types/user/user";

interface IBadgeInfo {
  badge: UserBadge;
  minScore: number;
}

export const EVENT_BADGE: UserBadge[] = ["딸기스무디", "라벤더", "민트초코"];

export const BADGE_COLOR: Record<UserBadge, string> = {
  아메리카노: "gray",
  라떼: "orange",
  마키아또: "green",
  유스베리: "red",
  에스프레소: "purple",
  모카: "yellow",
  콜드브루: "twitter",
  아인슈페너: "teal",
  딸기스무디: "badgePink",
  라벤더: "facebook",
  민트초코: "badgeMint",
};

export const BADGE_INFO: IBadgeInfo[] = [
  { badge: "아메리카노", minScore: 0 },
  { badge: "라떼", minScore: 10 },
  { badge: "마키아또", minScore: 30 },
  { badge: "콜드브루", minScore: 50 },
  { badge: "유스베리", minScore: 70 },
  { badge: "모카", minScore: 90 },
  { badge: "아인슈페너", minScore: 110 },
  { badge: "에스프레소", minScore: 130 },
];
