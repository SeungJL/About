import { atom } from "recoil";

export const isTimeChangeState = atom({
  key: "isTimeChange",
  default: false,
});

export const isVoteCompleteState = atom({
  key: "isVoteComplete",
  default: false,
});
