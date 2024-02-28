import { atom } from "recoil";

export const renderHomeHeaderState = atom<boolean>({
  key: "renderHomeHeader",
  default: true,
});
