import { atom } from "recoil";

export const isRefetchingStudyState = atom({
  key: "isRefetchingStudy",
  default: false,
});
export const isRefetchingStudyDetailState = atom({
  key: "isRefetchingStudyDetail",
  default: false,
});
