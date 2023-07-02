import { atom } from "recoil";

export const isPointLoadingState = atom({
  key: "isPointLoading",
  default: true,
});
export const isMainLoadingState = atom({
  key: "isMainLoading",
  default: true,
});

export const isRankingLoadingState = atom({
  key: "isRankingloading",
  default: true,
});

export const isGatherLoadingState = atom({
  key: "isGatherLoading",
  default: true,
});

export const isRecordLoadingState = atom({
  key: "isRecordLoading",
  default: true,
});
