import { atom, RecoilEnv } from "recoil";
import { Location } from "../types/system";
import { IUser } from "../types/user/user";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const userAccessUidState = atom<string>({
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
