import { Dayjs } from "dayjs";
import { atom, RecoilEnv } from "recoil";
import {
  IParticipation,
  IStudyStartTime,
  StudyDate,
} from "../types/study/studyDetail";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const participationsState = atom<IParticipation[]>({
  key: "participationsState",
  default: null,
});

export const voteDateState = atom<Dayjs>({
  key: "voteDateState",
  default: null,
});

export const isVotingState = atom({
  key: "isVotingState",
  default: false,
});

export const studyDateStatusState = atom<StudyDate>({
  key: "studyDateStatusState",
  default: null,
});

export const myStudyFixedState = atom<IParticipation>({
  key: "myStudyFixedState",
  default: null,
});

export const studyStartTimeState = atom<IStudyStartTime[]>({
  key: "studyStartTimeState",
  default: null,
});
