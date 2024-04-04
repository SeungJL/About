import { atom } from "recoil";
import { IGatherWriting } from "../types2/page/gather";
import { IGroupWriting } from "../types2/page/group";

export const sharedGatherWritingState = atom<IGatherWriting>({
  key: "sharedGatherWritingState",
  default: null,
});
export const sharedGroupWritingState = atom<IGroupWriting>({
  key: "sharedGroupWritingState",
  default: null,
});
