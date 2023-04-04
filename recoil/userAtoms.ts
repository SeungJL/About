import { atom } from "recoil";
import { IUserBadge } from "../types/user";

export const numOfUserState = atom({
  key: "numOfUser",
  default: 0,
});

export const userBadgeState = atom<IUserBadge>({
  key: "userBadge",
  default: { badge: "아메리카노", color: "gray" },
});
