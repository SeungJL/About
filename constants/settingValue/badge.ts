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
  민트초코: "mintTheme",
};

export const BADGE_INFO: IBadgeInfo[] = [
  { badge: "아메리카노", minScore: 0 },
  { badge: "라떼", minScore: 20 },
  { badge: "마키아또", minScore: 40 },
  { badge: "콜드브루", minScore: 60 },
  { badge: "유스베리", minScore: 80 },
  { badge: "모카", minScore: 100 },
  { badge: "아인슈페너", minScore: 120 },
  { badge: "에스프레소", minScore: 140 },
];
