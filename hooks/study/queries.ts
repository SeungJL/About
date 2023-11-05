import axios, { AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import {
  STUDY_ARRIVED_CNT,
  STUDY_ATTEND_RECORD,
  STUDY_PLACE,
  STUDY_START_TIME,
  STUDY_VOTE,
} from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { QueryOptions } from "../../types/reactTypes";

import { IArrivedData, IStudyPlaces } from "../../types/study/study";
import {
  IPlace,
  IStudyPreferencesQuery,
  IVote,
} from "../../types/study/studyDetail";

import { Location } from "../../types/system";

export const useStudyPlacesQuery = (
  location: Location | "all",
  options?: QueryOptions<IPlace[]>
) =>
  useQuery<IPlace[], AxiosError, IPlace[]>(
    [STUDY_PLACE, location],
    async () => {
      const res = await axios.get<IPlace[]>(`${SERVER_URI}/place`);
      const places = res.data.filter(
        (place) =>
          place.brand !== "자유 신청" &&
          (location === "all" || place.location === location)
      );
      return places;
    },
    options
  );

export const useStudyVoteQuery = (
  date: Dayjs,
  location: Location,
  options?: QueryOptions<IVote>
) =>
  useQuery<IVote, AxiosError, IVote>(
    [STUDY_VOTE, dayjsToStr(date), location],
    async () => {
      const res = await axios.get<IVote>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}`,
        {
          params: { location },
        }
      );
      return res.data;
    },
    options
  );

interface IStudyStartTimeData {
  place_id: string;
  startTime: string;
}

export const useStudyStartTimeQuery = (
  date: Dayjs,
  placeId: string,
  options?: QueryOptions<Dayjs>
) =>
  useQuery(
    [STUDY_START_TIME, dayjsToStr(date), placeId],
    async () => {
      const res = await axios.get<IStudyStartTimeData[]>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}/start`
      );
      const findItem = res.data.find(
        (item) => item.place_id === placeId
      )?.startTime;
      if (findItem) return dayjs(findItem);
    },
    options
  );

export const useStudyAttendRecordQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: QueryOptions<IArrivedData[]>
) =>
  useQuery(
    [STUDY_ATTEND_RECORD, dayjsToStr(startDay), dayjsToStr(endDay)],
    async () => {
      const res = await axios.get<IArrivedData[]>(
        `${SERVER_URI}/vote/arrived`,
        {
          params: {
            startDay: dayjsToStr(startDay),
            endDay: dayjsToStr(endDay),
          },
        }
      );
      return res.data;
    },
    options
  );

interface IArrivedTotal {
  [key: string]: number;
}
export const useStudyArrivedCntQuery = (
  uid: string,
  options?: QueryOptions<number>
) =>
  useQuery(
    [STUDY_ARRIVED_CNT, uid],
    async () => {
      if (!uid) return;
      const res = await axios.get<IArrivedTotal>(
        `${SERVER_URI}/vote/arriveCnt`
      );
      return res.data?.[uid];
    },
    options
  );

export const useStudyPreferenceQuery = (options?: QueryOptions<IStudyPlaces>) =>
  useQuery(
    "studyPreference",
    async () => {
      const res = await axios.get<IStudyPreferencesQuery>(
        `${SERVER_URI}/user/preference`
      );
      return res.data?.studyPreference;
    },
    options
  );
