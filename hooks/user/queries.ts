import axios, { AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useQueries, useQuery, UseQueryOptions } from "react-query";
import { IMonthStartToEnd } from "../../components/Pages/User/AttendChart";
import {
  USER_FINDPARTICIPATION,
  USER_FINDVOTE,
  USER_FINDVOTES,
  USER_FINFACTIVE,
} from "../../libs/queryKeys";
import { IUser } from "../../models/user";

export const useActiveQuery = (
  options?: Omit<
    UseQueryOptions<IUser, AxiosError, IUser>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IUser, AxiosError, IUser>(
    USER_FINFACTIVE,
    async () => {
      const res = await axios.get<IUser>(`/api/user/profile`);
      return res.data;
    },
    options
  );

export const useParticipationRateQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: Omit<UseQueryOptions<any, AxiosError, any>, "queryKey" | "queryFn">
) =>
  useQuery<any, AxiosError, any>(
    USER_FINDPARTICIPATION,
    async () => {
      const res = await axios.get<any>(`/api/user/participationrate`, {
        params: {
          startDay: startDay.format("YYYY-MM-DD"),
          endDay: endDay.format("YYYY-MM-DD"),
        },
      });
      return res.data;
    },
    options
  );

export const useVoteRateQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: Omit<
    UseQueryOptions<number, AxiosError, number>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<number, AxiosError, number>(
    [USER_FINDVOTE],
    async () => {
      const res = await axios.get(`/api/user/voterate`, {
        params: {
          startDay: startDay.format("YYYY-MM-DD"),
          endDay: endDay.format("YYYY-MM-DD"),
        },
      });
      return res.data;
    },
    options
  );
export const useAttendRateQueries = (
  monthList: IMonthStartToEnd[],
  options?: Omit<
    UseQueryOptions<IRate[], AxiosError, IRate>,
    "queryKey" | "queryFn"
  >
) =>
  useQueries(
    monthList.map((month, idx) => {
      return {
        queryKey: [USER_FINDPARTICIPATION, idx],
        queryFn: async () => {
          const res = await axios.get<number, AxiosError, number>(
            `/api/user/participationrate`,
            {
              params: {
                startDay: month.startDay.format("YYYY-MM-DD"),
                endDay: month.endDay.format("YYYY-MM-DD"),
              },
            }
          );
          return (res as any).data;
        },
      };
    })
  );
export const useVoteRateQueries = (
  monthList: IMonthStartToEnd[],
  options?: Omit<
    UseQueryOptions<IRate[], AxiosError, IRate[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQueries(
    monthList.map((month, idx) => {
      return {
        queryKey: [USER_FINDVOTES, idx],
        queryFn: async () => {
          const res = await axios.get<number, AxiosError, number>(
            `/api/user/voterate`,
            {
              params: {
                startDay: month.startDay.format("YYYY-MM-DD"),
                endDay: month.endDay.format("YYYY-MM-DD"),
              },
            }
          );
          return (res as any).data;
        },
      };
    })
  );

export interface IRate {
  name: string;
  cnt: number;
}
