import dayjs, { Dayjs } from "dayjs";
import {
  STUDY_DISTANCE,
  STUDY_VOTE_END_HOUR,
  STUDY_VOTE_START_HOUR,
} from "../constants/settingValue/study";

import {
  IParticipation,
  StudyDateStatus,
  StudyStatus,
} from "../types/study/studyDetail";
import { Location } from "../types/system";
import { getCurrentDate, getCurrentHour } from "./dateHelpers";

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

export const getStudySecondRecommendation = (
  location: Location,
  startPlace: string,
  targetDistance: number
) => {
  let placesAtDistance = new Set();

  const targets = STUDY_DISTANCE[location][targetDistance];
  if (targets) {
    targets.forEach((pair) => {
      if (pair[0] === startPlace) placesAtDistance.add(pair[1]);
      else if (pair[1] === startPlace) placesAtDistance.add(pair[0]);
    });
  }

  return Array.from(placesAtDistance);
};

export const filterStudyPlaces = (
  pars: IParticipation[],
  location: Location,
  isWeekend: boolean
) => {
  console.log(isWeekend);
  const filterPars = pars.filter((par) => {
    const place = par.place;
    if (location === "수원" && place.branch === "행궁동") {
      return isWeekend
        ? place.brand === "행궁 81.2"
        : place.brand === "본지르르";
    }
    return true;
  });
  return filterPars;
};
