import axios, { AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import {
  STUDY_ATTEND_RECORD,
  STUDY_PLACE,
  STUDY_START_TIME,
  STUDY_VOTE,
} from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { QueryOptions } from "../../types/reactTypes";

import {
  IAbsentInfo,
  IArrivedData,
  IStudyPlaces,
} from "../../types/study/study";
import {
  IPlace,
  IStudyPreferencesQuery,
  IVote,
} from "../../types/study/studyDetail";

import { Location } from "../../types/system";

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
      return dayjs(findItem);
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

export const useStudyAbsentQuery = (
  date: Dayjs,
  options?: QueryOptions<IAbsentInfo[]>
) =>
  useQuery(
    "studyAbsent",
    async () => {
      const res = await axios.get<IAbsentInfo[]>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}/absence`
      );
      return res.data;
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
interface IArrivedTotal {
  [key: string]: number;
}
export const useStudyArrivedCntQuery = (
  options?: QueryOptions<IArrivedTotal>
) =>
  useQuery(
    "arriveCnt",
    async () => {
      const res = await axios.get<IArrivedTotal>(
        `${SERVER_URI}/vote/arriveCnt`
      );
      return res.data;
    },
    options
  );

// export const useStudyArrivedQuery = (
//   date: Dayjs,
//   options?: Omit<
//     UseQueryOptions<
//       { user: IUser; memo: string }[],
//       AxiosError,
//       { user: IUser; memo: string }[]
//     >,
//     "mutationKey" | "mutationFn"
//   >
// ) =>
//   useQuery<
//     { user: IUser; memo: string }[],
//     AxiosError,
//     { user: IUser; memo: string }[]
//   >(
//     ARRIVE_FINDMEMO,
//     async () => {
//       const res = await axios.get(
//         `${SERVER_URI}/vote/${dayjsToStr(date)}/arrived`
//       );
//       return res.data;
//     },
//     options
//   );
