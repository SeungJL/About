import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import { getStudyDate } from "../helpers/studyHelpers";
import {
  IParticipation,
  IStudyStartTime,
  StudyDateStatus,
} from "../types/study/studyDetail";

export const voteDateState = atom<Dayjs>({
  key: "voteDate",
  default: null,
});

export const studyDateStatusState = selector<StudyDateStatus>({
  key: "studyDateStatus2",
  get: ({ get }) => {
    const voteDate = get(voteDateState);
    if (voteDate) return getStudyDate(voteDate);
  },
});

export const participationsState = atom<IParticipation[]>({
  key: "participations",
  default: null,
});

export const studyStartTimeArrState = atom<IStudyStartTime[]>({
  key: "studyStartTimeArr",
  default: null,
});
