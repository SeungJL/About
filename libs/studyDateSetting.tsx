import dayjs, { Dayjs } from "dayjs";
import { STUDY_VOTE_END_HOUR } from "../constants/study";
import { StudyDate } from "../recoil/studyAtoms";

type GetStudyDate = (voteDate: Dayjs) => StudyDate;

export const getStudyDate: GetStudyDate = (voteDate) => {
  const currentDate = dayjs().date();
  const currentHours = dayjs().hour();
  const selectDate = voteDate.date();

  if (currentDate === selectDate - 1) {
    if (currentHours >= STUDY_VOTE_END_HOUR) return "today";
  }
  if (currentDate === selectDate) {
    if (currentHours < STUDY_VOTE_END_HOUR) return "today";
    else return "passed";
  }
  if (selectDate < currentDate) return "passed";
  if (currentDate < selectDate) return "not passed";
};
