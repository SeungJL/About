import { atom } from "recoil";
import { IModalContext } from "../models/modals";

export const modalContextState = atom<IModalContext>({
  key: "modalContext",
  default: {},
});

export const isShowStudyVoteModalState = atom({
  key: "isShowVoteStudyModal",
  default: false,
});

export const showVoterState = atom<Number>({
  key: "showVoterState",
  default: null,
});

export const ShowOpenResultState = atom<Number>({
  key: "showOpenResult",
  default: null,
});

export const isShowVoteCancleState = atom<Boolean>({
  key: "isShowVoteCancel",
  default: false,
});

export const isShowNotCompletedState = atom<Boolean>({
  key: "notCompleted",
  default: false,
});

export const isShowUserInfoSmState = atom({
  key: "isShowUserInfoSm",
  default: false,
});
