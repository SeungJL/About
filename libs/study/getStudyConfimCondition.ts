import { StudyDateStatus } from "../../types/studyTypes/studySubTypes";
import { StudyStatus } from "../../types/studyTypes/studyVoteTypes";
import { getHour } from "../../utils/dateTimeUtils";

export const getStudyConfimCondition = (
  studyDateStatus: StudyDateStatus,
  studyStatus: StudyStatus
) => {
  if (
    studyDateStatus === "today" &&
    studyStatus === "pending" &&
    getHour() === 23
  ) {
    return true;
  }
  return false;
};
