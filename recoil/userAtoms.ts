import { atom } from "recoil";
import { Location } from "../types/system";

export const userLocationState = atom<Location>({
  key: "userLocation",
  default: null,
});
