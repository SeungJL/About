import { atom, selector } from "recoil";
import { INoticeState } from "../models/notice";

export const isWriteState = atom({
  key: "isWrite",
  default: false,
});
