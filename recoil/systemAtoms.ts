import { atom } from "recoil";
import { Location } from "../types/system";

export const isMainLoadingState = atom({
  key: "isMainLoading",
  default: true,
});

export const locationState = atom<Location>({
  key: "location",
  default: null,
});
