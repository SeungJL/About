import dayjs, { Dayjs } from "dayjs";
import {
  STUDY_SPACE_ORDER,
  STUDY_VOTE_END_HOUR,
  STUDY_VOTE_START_HOUR,
} from "../constants/settingValue/study";

import {
  IParticipation,
  IPlace,
  StudyDateStatus,
  StudyStatus,
} from "../types/study/studyDetail";
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
  const getCount = (participation: IParticipation) => {
    if (!isPassed) return participation.attendences.length;
    return participation.attendences.filter((who) => who.firstChoice).length;
  };
  const getStatusPriority = (status: StudyStatus) => {
    switch (status) {
      case "open":
        return 1;
      case "free":
        return 2;
      default:
        return 3;
    }
  };

  return participations.sort((a, b) => {
    const aStatusPriority = getStatusPriority(a.status);
    const bStatusPriority = getStatusPriority(b.status);

    if (aStatusPriority !== bStatusPriority)
      return aStatusPriority - bStatusPriority;

    return getCount(b) - getCount(a);
  });
};

//투표 시작 시간 기준까지는 오늘, 넘어가면 내일
export const getInterestingDate = () => {
  const currentDate = getCurrentDate();
  if (dayjs() < currentDate.hour(STUDY_VOTE_START_HOUR)) return currentDate;
  return currentDate.add(1, "day");
};

type GetStudyDate = (voteDate: Dayjs) => StudyDateStatus;

//today는 스터디 결과 확정 시간 기준으로 24시간
export const getStudyDate: GetStudyDate = (voteDate) => {
  const currentDate = getCurrentDate();
  const currentHours = getCurrentHour();

  const isTodayCondition =
    currentDate.isSame(voteDate) ||
    (voteDate.isSame(currentDate.add(1, "day")) &&
      currentHours >= STUDY_VOTE_END_HOUR);

  if (isTodayCondition) return "today";
  if (voteDate.isBefore(currentDate)) return "passed";
  return "not passed";
};
