import { atom } from "recoil";
import { IattendCheckPresent } from "../types/modal/attendCheck";

export const isVoteCompletedState = atom({
  key: "isVoteCompletedState",
  default: false,
});

export const attendCheckWinGiftState = atom<IattendCheckPresent>({
  key: "attendCheckWinGiftState",
  default: null,
});

export const modalRenderTriggerState = atom({
  key: "modalRenderTriggerState",
  default: false,
});
