import axios, { AxiosError, AxiosResponse } from "axios";
import { Dayjs } from "dayjs";
import { useQuery, UseQueryOptions } from "react-query";
import { ARRIVE_FINDMEMO, PLACE_FINDALL, VOTE_GET } from "../../libs/queryKeys";
import { IPlace, IStudyStart, IVote } from "../../types/studyDetails";
import { IArrivedData } from "../../types/studyRecord";
import { Location } from "../../types/system";
import { IUser } from "../../types/user";
import { IAbsentInfo } from "../../types/userAction";

export const useVoteQuery = (
  date: Dayjs,
  location: Location, // 새로운 location 변수
  options?: Omit<
    UseQueryOptions<IVote, AxiosError, IVote, [string, Dayjs, Location]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IVote, AxiosError, IVote, [string, Dayjs, Location]>(
    [VOTE_GET, date, location], // location 변수를 포함하는 배열
    async () => {
      const res = await axios.get<IVote>(
        `/api/vote/${date.format("YYYY-MM-DD")}?location=${location}` // location 변수를 API 요청 URL에 추가
      );
      return res.data;
    },
    options
  );
};

export const usePlaceQuery = (
  options?: Omit<
    UseQueryOptions<IPlace[], AxiosError, IPlace[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IPlace[], AxiosError, IPlace[]>(
    PLACE_FINDALL,
    async () => {
      const res = await axios.get<IPlace[]>(`/api/place`);
      return res.data;
    },
    options
  );

export function fetchFamousBooks() {
  return fetch("/api/book", {
    method: "get",
  }).then((response) => response.json());
}

export const useArrivedQuery = (
  currentDate: Dayjs,
  options?: Omit<
    UseQueryOptions<
      { user: IUser; memo: string }[],
      AxiosError,
      { user: IUser; memo: string }[]
    >,
    "mutationKey" | "mutationFn"
  >
) =>
  useQuery<
    { user: IUser; memo: string }[],
    AxiosError,
    { user: IUser; memo: string }[]
  >(
    ARRIVE_FINDMEMO,
    async () => {
      const res = await axios.get(
        `/api/vote/${currentDate.format("YYYY-MM-DD")}/arrived`
      );
      return res.data;
    },
    options
  );

export const useStudyStartQuery = (
  date: Dayjs,
  options?: Omit<
    UseQueryOptions<IStudyStart[], AxiosError, IStudyStart[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery(
    "studyStart",
    async () => {
      const res = await axios.get<IStudyStart[]>(
        `/api/vote/${date.format("YYYY-MM-DD")}/start`
      );
      return res.data;
    },
    options
  );

export const useArrivedDataQuery = (
  date?: Dayjs,
  options?: Omit<
    UseQueryOptions<IArrivedData[], AxiosError, IArrivedData[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery(
    "arrivedData",
    async () => {
      if (!date) return;
      const res = await axios.get<IArrivedData[]>(
        `/api/vote/${date.format("YYYY-MM-DD")}/arrived`
      );
      console.log(4, res);
      return res.data;
    },
    options
  );

export const useAbsentDataQuery = (
  date: Dayjs,
  options?: Omit<
    UseQueryOptions<IAbsentInfo[], AxiosError, IAbsentInfo[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery(
    "absentData",
    async () => {
      const res = await axios.get<IAbsentInfo[]>(
        `/api/vote/${date.format("YYYY-MM-DD")}/absence`
      );
      return res.data;
    },
    options
  );
