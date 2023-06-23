import { atom } from "recoil";

export const isPointLoadingState = atom({
  key: "isPointLoading",
  default: true,
});
export const isMainLoadingState = atom({
  key: "isMainLoading",
  default: true,
});
