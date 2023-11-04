import axios, { AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import { STUDY_PLACE, STUDY_VOTE_INFO } from "../../constants/keys/queryKeys";
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
  IStudyStartTime,
  IVote,
} from "../../types/study/studyDetail";

import { Location } from "../../types/system";

export const useStudyVoteQuery = (
  date: Dayjs,
  location: Location,
  options?: QueryOptions<IVote>
) => {
  return useQuery<IVote, AxiosError, IVote>(
    [STUDY_VOTE_INFO, dayjsToStr(date), location],
    async () => {
      const res = await axios.get<IVote>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}?location=${location}`
      );

      return res.data;
    },

    options
  );
};

export const useStudyPlacesQuery = (options?: QueryOptions<IPlace[]>) =>
  useQuery<IPlace[], AxiosError, IPlace[]>(
    [STUDY_PLACE, "all"],
    async () => {
      const res = await axios.get<IPlace[]>(`${SERVER_URI}/place`);
      return res.data;
    },
    options
  );
export const useStudyPlacesLocationQuery = (
  location: Location,
  options?: QueryOptions<IPlace[]>
) =>
  useQuery<IPlace[], AxiosError, IPlace[]>(
    [STUDY_PLACE, "location"],
    async () => {
      const res = await axios.get<IPlace[]>(`${SERVER_URI}/place`);
      const places = res.data.filter(
        (place) => place.location === location && place.brand !== "자유 신청"
      );
      return places;
    },
    options
  );

export const useStudyStartTimeQuery = (
  date: Dayjs,
  options?: QueryOptions<IStudyStartTime[]>
) =>
  useQuery(
    ["studyStartTime", date],
    async () => {
      const res = await axios.get<{ place_id: string; startTime: string }[]>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}/start`
      );
      const data: IStudyStartTime[] = res.data.map((item) => ({
        placeId: item.place_id,
        startTime: dayjs(item.startTime),
      }));
      return data;
    },
    options
  );

export const useStudyCheckRecordsQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: QueryOptions<IArrivedData[]>
) =>
  useQuery(
    ["studyCheckRecords", dayjsToStr(startDay), dayjsToStr(endDay)],
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
