import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useQueries, useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../../constants/system";

import {
  USER_FINDPARTICIPATION,
  USER_FINDVOTES,
} from "../../../constants/queryKeys";
import { QueryOptions } from "../../../types/reactTypes";
import { IVoteRate } from "../../../types/study/studyRecord";
import { IDayjsStartToEnd } from "../../../types/timeAndDate";
import { IUserAttendRateQueries } from "../../../types/user/user";

export const useUserAttendRateQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: QueryOptions<IVoteRate[]>
) =>
  useQuery<IVoteRate[], AxiosError, IVoteRate[]>(
    "userParticipationRate",
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

export const useUserAttendRateAllQuery = (
  startDay: Dayjs,
  endDay: Dayjs,
  options?: QueryOptions<IVoteRate[]>
) =>
  useQuery<IVoteRate[], AxiosError, IVoteRate[]>(
    "userParticipationRateAll",
    async () => {
      const res = await axios.get<IVoteRate[]>(
        `${SERVER_URI}/user/participationrate/all`,
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

export const useUserAttendRateQueries = (
  monthList: IDayjsStartToEnd[],
  type?: string,
  options?: QueryOptions<IUserAttendRateQueries>
) =>
  useQueries(
    monthList.map((month, idx) => {
      return {
        queryKey: [USER_FINDPARTICIPATION, type, idx],
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
          return { idx, data: res.data };
        },
        ...options,
      };
    })
  );

export const useUserVoteRateQueries = (
  monthList: IDayjsStartToEnd[],
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

// export const useUserVoteRateQuery = (
//   startDay: Dayjs,
//   endDay: Dayjs,
//   options?: Omit<
//     UseQueryOptions<IVoteRate[], AxiosError, IVoteRate[]>,
//     "queryKey" | "queryFn"
//   >
// ) =>
//   useQuery<IVoteRate[], AxiosError, IVoteRate[]>(
//     [USER_FINDVOTE],
//     async () => {
//       const res = await axios.get<IVoteRate[]>(`${SERVER_URI}/user/voterate`, {
//         params: {
//           startDay: startDay.format("YYYY-MM-DD"),
//           endDay: endDay.format("YYYY-MM-DD"),
//         },
//       });
//       return res.data;
//     },
//     options
//   );
