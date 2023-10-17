import dayjs, { Dayjs } from "dayjs";
import {
  STUDY_SPACE_ORDER,
  STUDY_VOTE_END_HOUR,
  STUDY_VOTE_START_HOUR,
} from "../constants/settingValue/study";
import { IParticipation, IPlace, StudyDate } from "../types/study/studyDetail";
import { getCurrentDate, getCurrentHour } from "./dateHelpers";

export const arrangeSpace = (participations: IParticipation[] | IPlace[]) => {
  const arrangedSpaceArr = [];

  participations.forEach((participant) => {
    const ID =
      (participant as IParticipation)?.place?._id ||
      (participant as IPlace)?._id;

    if (STUDY_SPACE_ORDER[ID] !== undefined) {
      arrangedSpaceArr[STUDY_SPACE_ORDER[ID]] = participant;
    }
  });

  return arrangedSpaceArr;
};

export const arrangeMainSpace = (
  participations: IParticipation[],
  isPassed?: boolean
) => {
  const compare = (a: IParticipation, b: IParticipation) => {
    const cntA = !isPassed
      ? a.attendences.length
      : a.attendences.filter((who) => who.firstChoice).length;
    const cntB = !isPassed
      ? b.attendences.length
      : b.attendences.filter((who) => who.firstChoice).length;

    if (cntA > cntB) return -1;
    if (cntA < cntB) return 1;
    return 0;
  };

  return participations.sort(compare);
};

export const getInterestingDate = () => {
  const currentDate = getCurrentDate();
  if (dayjs() < currentDate.hour(STUDY_VOTE_START_HOUR)) return currentDate;
  return currentDate.add(1, "day");
};

type GetStudyDate = (voteDate: Dayjs) => StudyDate;

export const getStudyDate: GetStudyDate = (voteDate) => {
  const currentDate = getCurrentDate();
  const currentHours = getCurrentHour();

  if (currentDate.isSame(voteDate))
    return currentHours < STUDY_VOTE_END_HOUR ? "today" : "passed";
  if (voteDate.isBefore(currentDate)) return "passed";
  if (
    voteDate.isSame(currentDate.add(1, "day")) &&
    currentHours >= STUDY_VOTE_END_HOUR
  ) {
    return "today";
  }
  return "not passed";
};
