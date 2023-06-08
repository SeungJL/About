import { Dayjs } from "dayjs";
import { atom, RecoilEnv } from "recoil";
import { IParticipation } from "../types/studyDetails";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const voteDateState = atom<Dayjs>({
  key: "date",
  default: null,
});

export const isVotingState = atom({
  key: "isVoting",
  default: false,
});

export const studyDateState = atom<"passed" | "today" | "not passed">({
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

export const refetchVoteState = atom({
  key: "refetchVote",
});

export const studyStartTimeState = atom<Dayjs>({
  key: "studyStartTime",
  default: null,
});
