import { StudyDateStatus } from "../../types/models/studyTypes/studySubTypes";
import { StudyStatus } from "../../types/models/studyTypes/studyVoteTypes";
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
