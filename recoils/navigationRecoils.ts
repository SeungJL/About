import { atom } from "recoil";

export const prevPageUrlState = atom({
  key: "PrevPageUrl",
  default: null,
});

export const slideDirectionState = atom<"right" | "left">({
  key: "SlideDirection",
  default: "right",
});
