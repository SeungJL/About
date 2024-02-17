import { atom } from "recoil";

export const isRefetchstudyState = atom({
  key: "isRefetchstudy",
  default: false,
});

export const isRefetchUserInfoState = atom({
  key: "isRefetchUserInfo",
  default: false,
});

export const isRefetchGroupInfoState = atom({
  key: "isRefetchGroup",
  default: false,
});
