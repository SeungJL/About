import { atom } from "recoil";

export const isVoteCompletedState = atom({
  key: "isVoteCompleted",
  default: false,
});

export const isNoticeAlertState = atom({
  key: "isNoticeAlert",
  default: false,
});
