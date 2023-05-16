import { atom } from "recoil";
import { IGatherContent } from "../types/gather";

export const gatherContentState = atom<IGatherContent>({
  key: "gatherContent",
  default: null,
});
