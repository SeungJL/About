import { atom } from "recoil";

export const prevPageUrlState = atom({
  key: "prevPageUrl",
  default: "",
});

export const isProfileEditState = atom({
  key: "isProfileEdit",
  default: false,
});
