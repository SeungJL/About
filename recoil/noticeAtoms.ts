import { atom, selector } from "recoil";

export const isWriteState = atom({
  key: "isWrite",
  default: false,
});
