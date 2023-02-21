import { atom } from "recoil";

export const gatherIdState = atom({
  key: "gatherId",
  default: "",
});
export const gatherJoinState = atom({
  key: "gatherJoin",
  default: false,
});
