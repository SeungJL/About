import { atom } from "recoil";

export const updateStudyState = atom({
  key: "updateStudy",
  default: false,
});
export const updateStudySubState = atom({
  key: "updateStudySub",
  default: false,
});
