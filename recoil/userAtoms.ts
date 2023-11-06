import { atom } from "recoil";
import { Location } from "../types/system";
import { IUser } from "../types/user/user";

export const userAccessUid = atom<string>({
  key: "userAccessUid",
  default: null,
});

export const userInfoState = atom<IUser>({
  key: "UserInfo",
  default: null,
});
export const isGuestState = atom({
  key: "IsGuest",
  default: false,
});

export const locationState = atom<Location>({
  key: "Location",
  default: null,
});
