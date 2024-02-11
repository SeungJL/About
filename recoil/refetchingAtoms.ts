import { atom } from "recoil";

export const isRefetchstudyState = atom({
  key: "isRefetchstudy",
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
