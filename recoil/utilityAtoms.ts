import { atom } from "recoil";
import { IModalContext } from "../types/interaction";

export const isShowNotCompletedState = atom<Boolean>({
  key: "notCompleted",
  default: false,
});
export const modalContextState = atom<IModalContext>({
  key: "modalContext",
  default: {},
});
export const isVoteCompleteState = atom({
  key: "isVoteComplete",
  default: false,
});

export const isNoticeAlertState = atom({
  key: "isNoticeAlert",
  default: false,
});
