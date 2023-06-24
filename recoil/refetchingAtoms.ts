import { atom } from "recoil";

export const isRefetchingStudyState = atom({
  key: "isRefetchingStudy",
  default: false,
});
export const isRefetchingStudySpacelState = atom({
  key: "isRefetchingStudySpace",
  default: false,
});
