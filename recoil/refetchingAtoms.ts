import { atom } from "recoil";

export const isRefetchStudySpaceState = atom({
  key: "isRefetchStudySpace",
  default: false,
});

export const isRefetchUserInfoState = atom({
  key: "isRefetchUserInfo",
  default: false,
});

export const isRefetchGroupStudyInfoState = atom({
  key: "isRefetchGroupStudy",
  default: false,
});
