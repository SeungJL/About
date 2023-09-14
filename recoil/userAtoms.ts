import { atom } from "recoil";
import { Location } from "../types/system";
import { IUser } from "../types/user/user";

export const userInfoState = atom<IUser>({
  key: "userInfo",
  default: null,
});
export const isGuestState = atom({
  key: "isGuest",
  default: false,
});

export const locationState = atom<Location>({
  key: "location",
  default: null,
});
