import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useQueries, useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../../constants/system";

import {
  USER_FINDPARTICIPATION,
  USER_FINDVOTE,
  USER_FINDVOTES,
} from "../../../libs/queryKeys";
import { IVoteRate } from "../../../types/studyRecord";
import { IDateStartToEnd } from "../../../types/utils";

export const useUserParticipationRateQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: Omit<
    UseQueryOptions<IVoteRate[], AxiosError, IVoteRate[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IVoteRate[], AxiosError, IVoteRate[]>(
    USER_FINDPARTICIPATION,
    async () => {
      const res = await axios.get<IVoteRate[]>(
        `${SERVER_URI}/user/participationrate`,
        {
          params: {
            startDay: startDay.format("YYYY-MM-DD"),
            endDay: endDay.format("YYYY-MM-DD"),
          },
        }
      );
      return res.data;
    },
    options
  );

export const useUserVoteRateQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: Omit<
    UseQueryOptions<IVoteRate[], AxiosError, IVoteRate[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IVoteRate[], AxiosError, IVoteRate[]>(
    [USER_FINDVOTE],
    async () => {
      const res = await axios.get<IVoteRate[]>(`${SERVER_URI}/user/voterate`, {
        params: {
          startDay: startDay.format("YYYY-MM-DD"),
          endDay: endDay.format("YYYY-MM-DD"),
        },
      });
      return res.data;
    },
    options
  );
export const useUserAttendRateQueries = (
  monthList: IDateStartToEnd[],
  options?: Omit<
    UseQueryOptions<IVoteRate[], AxiosError, IVoteRate[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQueries(
    monthList.map((month, idx) => {
      return {
        queryKey: [USER_FINDPARTICIPATION, idx],
        queryFn: async () => {
          const res = await axios.get<IVoteRate[]>(
            `${SERVER_URI}/user/participationrate`,
            {
              params: {
                startDay: month.start.format("YYYY-MM-DD"),
                endDay: month.end.format("YYYY-MM-DD"),
              },
            }
          );
          return res.data;
        },
        ...options,
      };
    })
  );

export const useUserVoteRateQueries = (
  monthList: IDateStartToEnd[],
  options?: Omit<
    UseQueryOptions<IVoteRate[], AxiosError, IVoteRate[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQueries(
    monthList.map((month, idx) => {
      return {
        queryKey: [USER_FINDVOTES, idx],
        queryFn: async () => {
          const res = await axios.get<IVoteRate[]>(
            `${SERVER_URI}/user/voterate`,
            {
              params: {
                startDay: month.start.format("YYYY-MM-DD"),
                endDay: month.end.format("YYYY-MM-DD"),
              },
            }
          );
          return res.data;
        },
        ...options,
      };
    })
  );
