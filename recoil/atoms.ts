import { Dayjs } from "dayjs";
import { atom } from "recoil";
import { getInterestingDate } from "../libs/utils/dateUtils";

export const voteDateState = atom<Dayjs>({
  key: "date",
  default: getInterestingDate(),
});

export const isVotingState = atom({
  key: "isVoting",
  default: false,
});

export const studyDateState = atom<"passed" | "today" | "not passed">({
  key: "studyDate",
  default: "today",
});

export const mySpaceFixedState = atom({
  key: "mySpaceFixed",
  default: "",
});

