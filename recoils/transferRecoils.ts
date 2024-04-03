import { atom } from "recoil";
import { IDailyCheckWinList } from "../constants/serviceConstants/dailyCheckConstatns";
import { Alphabet } from "../types2/serviceTypes/alphabetTypes";
import { IUserSummary } from "../types2/userTypes/userInfoTypes";

export const transferAlphabetState = atom<Alphabet>({
  key: "TransferAlphabet",
  default: null,
});

export const transferDailyCheckWinState = atom<IDailyCheckWinList>({
  key: "TransferDailyCheckWin",
  default: null,
});
export const transferShowDailyCheckState = atom<boolean>({
  key: "TransferShowDailyCheck",
  default: true,
});

export const transferUserSummaryState = atom<IUserSummary>({
  key: "TransferUserSummary",
  default: null,
});
