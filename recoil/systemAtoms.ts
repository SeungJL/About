import { atom } from "recoil";
import { Location } from "../types/system";

export const isMainLoadingState = atom({
  key: "isMainLoading_atom",
  default: true,
});

export const locationState = atom<Location>({
  key: "location_atom",
  default: null,
});
