import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { STUDY_VOTE_INFO } from "../../libs/queryKeys";
import { dayjsToStr } from "../../libs/typeConverter";
import { IStudyPreferencesQuery } from "../../modals/study/studyQuickVoteModal/StudyQuickVoteModal";

import { IPlace, IStudyStart, IVote } from "../../types/studyDetails";
import { IArrivedData } from "../../types/studyRecord";
import { Location } from "../../types/system";
import { IAbsentInfo } from "../../types/userRequest";

export const useStudyVoteQuery = (
  date: Dayjs,
  location: Location,
  options?: Omit<
    UseQueryOptions<IVote, AxiosError, IVote>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IVote, AxiosError, IVote>(
    [STUDY_VOTE_INFO, date, location],
    async () => {
      const res = await axios.get<IVote>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}?location=${location}` // location 변수를 API 요청 URL에 추가
      );
      return res.data;
    },
    options
  );
};

export const useStudyPlaceQuery = (
  options?: Omit<
    UseQueryOptions<IPlace[], AxiosError, IPlace[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IPlace[], AxiosError, IPlace[]>(
    "studyPlace",
    async () => {
      const res = await axios.get<IPlace[]>(`${SERVER_URI}/place`);
      return res.data;
    },
    options
  );

export const useStudyStartTimeQuery = (
  date: Dayjs,
  options?: Omit<
    UseQueryOptions<IStudyStart[], AxiosError, IStudyStart[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery(
    "studyStartTime",
    async () => {
      const res = await axios.get<IStudyStart[]>(
        `${SERVER_URI}/vote/${dayjsToStr(date)}/start`
      );
      return res.data;
    },
    options
  );

export const useStudyCheckRecordsQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: Omit<
    UseQueryOptions<IArrivedData[], AxiosError, IArrivedData[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery(
    ["studyCheckRecords", startDay, endDay],
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
  options?: Omit<
    UseQueryOptions<IAbsentInfo[], AxiosError, IAbsentInfo[]>,
    "queryKey" | "queryFn"
  >
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

export const useStudyPreferenceQuery = (
  options?: Omit<
    UseQueryOptions<IStudyPreferencesQuery, AxiosError, IStudyPreferencesQuery>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery(
    "studyPreference",
    async () => {
      const res = await axios.get<IStudyPreferencesQuery>(
        `${SERVER_URI}/user/preference`
      );
      return res.data;
    },
    options
  );
interface IArrivedTotal {
  [key: string]: number;
}
export const useStudyArrivedCntQuery = (
  options?: Omit<
    UseQueryOptions<IArrivedTotal, AxiosError, IArrivedTotal>,
    "queryKey" | "queryFn"
  >
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
