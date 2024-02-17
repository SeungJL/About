import { atom } from "recoil";
import { IGatherWriting } from "../types/page/gather";
import { IGroupWriting } from "../types/page/Group";

export const sharedGatherWritingState = atom<IGatherWriting>({
  key: "sharedGatherWritingState",
  default: null,
});
export const sharedGroupWritingState = atom<IGroupWriting>({
  key: "sharedGroupWritingState",
  default: null,
});
