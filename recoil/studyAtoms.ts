import { Dayjs } from "dayjs";
import { atom } from "recoil";
import { IStudy, IStudyStartTime, StudyDate } from "../types/study/study";

export const voteDateState = atom<Dayjs>({
  key: "voteDate",
  default: null,
});

export const isVotingState = atom({
  key: "isVoting",
  default: false,
});

export const studyDateState = atom<StudyDate>({
  key: "studyDate",
  default: "today",
});

export const myStudyFixedState = atom<IStudy>({
  key: "myStudyFixed",
  default: null,
});

export const studyStartTimeState = atom<IStudyStartTime[]>({
  key: "studyStartTime",
  default: null,
});
