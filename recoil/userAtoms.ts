import { atom } from "recoil";
import { Location } from "../types/system";
import { IUserBadge } from "../types/user/user";

export const userLocationState = atom<Location>({
  key: "userLocation",
  default: null,
});

export const numOfUserState = atom({
  key: "numOfUser",
  default: 0,
});

export const userBadgeState = atom<IUserBadge>({
  key: "userBadge",
  default: { badge: "아메리카노", color: "gray" },
});
