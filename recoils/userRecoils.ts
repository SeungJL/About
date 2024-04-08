import { atom } from "recoil";

export const userLocationState = atom<Location>({
  key: "UserLocation",
  default: undefined,
});
