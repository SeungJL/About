import { atom } from "recoil";
import { IGatherWriting } from "../types/page/gather";
import { IGroupStudyWriting } from "../types/page/groupStudy";

export const sharedGatherWritingState = atom<IGatherWriting>({
  key: "sharedGatherWritingState",
  default: null,
});
export const sharedGroupStudyWritingState = atom<IGroupStudyWriting>({
  key: "sharedGroupStudyWritingState",
  default: null,
});
