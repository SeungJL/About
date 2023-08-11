import { atom } from "recoil";
import { IattendCheckPresent } from "../types/modal/attendCheck";

export const isVoteCompletedState = atom({
  key: "isVoteCompleted",
  default: false,
});

export const isNoticeAlertState = atom({
  key: "isNoticeAlert",
  default: false,
});

export const attendCheckWinGiftState = atom<IattendCheckPresent>({
  key: "attendCheckWinGift",
  default: null,
});
