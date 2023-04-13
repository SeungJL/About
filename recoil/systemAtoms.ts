import { atom } from "recoil";
import { Location } from "../types/system";

export const locationState = atom<Location>({
  key: "location",
  default: null,
});
