import { atom } from "recoil";
import { IParticipation, IStudyStartTime } from "../types/study/studyDetail";

export const participationsState = atom<IParticipation[]>({
  key: "participations",
  default: null,
});

export const studyStartTimeArrState = atom<IStudyStartTime[]>({
  key: "studyStartTimeArr",
  default: null,
});
