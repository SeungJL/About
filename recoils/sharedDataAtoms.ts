import { atom } from "recoil";
import { IGatherWriting } from "../types/models/gather";
import { IGroupWriting } from "../types/models/group";

export const sharedGatherWritingState = atom<IGatherWriting>({
  key: "sharedGatherWritingState",
  default: null,
});
export const sharedGroupWritingState = atom<IGroupWriting>({
  key: "sharedGroupWritingState",
  default: null,
});
