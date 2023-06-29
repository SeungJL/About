import dayjs, { Dayjs } from "dayjs";
import { STUDY_VOTE_END_HOUR, STUDY_VOTE_START_HOUR } from "../constants/study";
import { getInterestingDate } from "./utils/dateUtils";

export const getStudyDate = (voteDate: Dayjs) => {
  const currentHour = dayjs().hour();
  const voteDateNum = +voteDate.format("MDD");
  const defaultDate = +getInterestingDate().format("MDD");
  const isVoteDatePassed =
    currentHour >= STUDY_VOTE_START_HOUR && currentHour <= STUDY_VOTE_END_HOUR
      ? voteDateNum < +getInterestingDate().subtract(1, "day").format("MDD")
      : voteDateNum < defaultDate;

  const isStudyDateToday =
    (currentHour >= STUDY_VOTE_END_HOUR && voteDateNum <= defaultDate) ||
    (currentHour >= STUDY_VOTE_START_HOUR &&
      +voteDate.add(1, "day").format("MDD") <= defaultDate) ||
    (currentHour < STUDY_VOTE_START_HOUR && voteDateNum === defaultDate);

  return isVoteDatePassed
    ? "passed"
    : isStudyDateToday
    ? "today"
    : "not passed";
};
