import axios, { AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import {
  STUDY_ARRIVED_CNT,
  STUDY_ATTEND_RECORD,
  STUDY_PLACE,
  STUDY_PREFERENCE,
  STUDY_START_TIME,
  STUDY_VOTE,
} from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { dayjsToStr } from "../../utils/dateTimeUtils";

import { QueryOptions } from "../../types2/reactTypes";

import { IArrivedData } from "../../types2/study/study";
import {
  IPlace,
  IStudyPreferencesQuery,
  IStudyStartTime,
} from "../../types2/study/studyDetail";

import { Location } from "../../types2/serviceTypes/locationTypes";
import {
  IParticipation,
  IStudyPlaces,
  IVote,
} from "../../types2/studyTypes/studyVoteTypes";

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
  date: string,
  location: Location,
  options?: QueryOptions<IParticipation[]>
) =>
  useQuery<IParticipation[], AxiosError, IParticipation[]>(
    [STUDY_VOTE, date, location],
    async () => {
      const res = await axios.get<IVote>(`${SERVER_URI}/vote/${date}`, {
        params: { location },
      });
      return res.data.participations.filter(
        (par) => par.place.status === "active"
      );
    },
    options
  );

interface IStudyStartTimeData {
  place_id: string;
  startTime: string;
}

export const useStudyStartTimeQuery = (
  date: Dayjs,
  options?: QueryOptions<IStudyStartTime[]>
) =>
  useQuery(
    [STUDY_START_TIME, dayjsToStr(date)],
    async () => {
      const res = await axios.get<IStudyStartTimeData[]>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}/start`
      );

      return res.data.map((item) => ({
        ...item,
        startTime: dayjs(item.startTime),
      }));
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
    [STUDY_PREFERENCE],
    async () => {
      const res = await axios.get<IStudyPreferencesQuery>(
        `${SERVER_URI}/user/preference`
      );
      return res.data?.studyPreference;
    },
    options
  );
