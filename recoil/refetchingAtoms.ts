import { atom } from "recoil";

export const isRefetchStudyState = atom({
  key: "isRefetchStudy",
  default: false,
});
export const isRefetchStudySpacelState = atom({
  key: "isRefetchStudySpace",
  default: false,
});
