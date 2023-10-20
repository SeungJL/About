import { atom } from "recoil";

export const prevPageUrlState = atom({
  key: "prevPageUrl",
  default: "",
});

export const isProfileEditState = atom({
  key: "isProfileEdit",
  default: false,
});

export const reviewContentIdState = atom<number>({
  key: "reviewContentId",
  default: null,
});

export const isPrevBooleanState = atom<boolean>({
  key: "isPrevBooleanState",
  default: true,
});
