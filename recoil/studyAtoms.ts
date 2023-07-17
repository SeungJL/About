import { Dayjs } from "dayjs";
import { atom, RecoilEnv } from "recoil";
import { IParticipation, IStudyStartTime } from "../types/study/study";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const voteDateState = atom<Dayjs>({
  key: "date",
  default: null,
});

export const isVotingState = atom({
  key: "isVoting",
  default: false,
});

export type StudyDate = "passed" | "today" | "not passed";

export const studyDateState = atom<StudyDate>({
  key: "studyDate",
  default: "today",
});

export const mySpaceFixedState = atom<IParticipation>({
  key: "mySpaceFixed",
  default: null,
});

export const attendCheckState = atom<boolean>({
  key: "attendCheck",
  default: false,
});

export const studyStartTimeState = atom<IStudyStartTime[]>({
  key: "studyStartTime",
  default: null,
});
