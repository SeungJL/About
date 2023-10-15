import { atom } from "recoil";

export const isRefetchStudyState = atom({
  key: "isRefetchStudy",
  default: false,
});
export const isRefetchStudySpaceState = atom({
  key: "isRefetchStudySpace",
  default: false,
});

export const isRefetchUserInfoState = atom({
  key: "isRefetchUserInfoState",
  default: false,
});
