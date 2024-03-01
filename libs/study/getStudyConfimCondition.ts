import { StudyDateStatus } from "../../types2/studyTypes/studySubTypes";
import { StudyStatus } from "../../types2/studyTypes/studyVoteTypes";
import { getHour } from "../../utils/dateTimeUtils";

export const getStudyConfimCondition = (
  studyDateStatus: StudyDateStatus,
  studyStatus: StudyStatus
) => {
  if (
    studyDateStatus === "today" &&
    studyStatus === "pending" &&
    getHour() >= 9
  ) {
    return true;
  }
  return false;
};
