import { Dayjs } from "dayjs";
import { atom, RecoilEnv } from "recoil";
import {
  IParticipation,
  IStudyStartTime,
  StudyDate,
} from "../types/study/studyDetail";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const participationsState = atom<IParticipation[]>({
  key: "participations",
  default: null,
});

export const voteDateState = atom<Dayjs>({
  key: "voteDate",
  default: null,
});

export const isVotingState = atom({
  key: "isVoting",
  default: false,
});

export const studyDateStatusState = atom<StudyDate>({
  key: "studyDateStatus",
  default: null,
});

export const myStudyFixedState = atom<IParticipation>({
  key: "myStudyFixed",
  default: null,
});

export const studyStartTimeState = atom<IStudyStartTime[]>({
  key: "studyStartTime",
  default: null,
});
