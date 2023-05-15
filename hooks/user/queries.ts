import axios, { Axios, AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import {
  useQueries,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

import {
  USER_COMMENT,
  USER_FINDPARTICIPATION,
  USER_FINDVOTE,
  USER_FINDVOTES,
  USER_FINFACTIVE,
} from "../../libs/queryKeys";
import { IVoteRate } from "../../types/studyRecord";
import { IAvatar, IUser, IUserComment } from "../../types/user";
import { IDateStartToEnd } from "../../types/utils";

export const useUserInfoQuery = (
  options?: Omit<
    UseQueryOptions<IUser, AxiosError, IUser>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IUser, AxiosError, IUser>(
    USER_FINFACTIVE,
    async () => {
      const res = await axios.get<IUser>(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/profile`
      );
      return res.data;
    },
    options
  );

export const useParticipationRateQuery = (
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
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/participationrate`,
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

export const useVoteRateQuery = (
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
      const res = await axios.get<IVoteRate[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/voterate`,
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
export const useAttendRateQueries = (
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
            `${process.env.NEXT_PUBLIC_SERVER_URI}/user/participationrate`,
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

export const useVoteRateQueries = (
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
            `${process.env.NEXT_PUBLIC_SERVER_URI}/user/voterate`,
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

export const useCommentQuery = (
  options?: Omit<
    UseQueryOptions<IComment, AxiosError, IComment>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IComment, AxiosError, IComment>(
    USER_COMMENT,
    async () => {
      const res = await axios.get<IComment>(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/comment`
      );
      return res.data;
    },
    options
  );

export const useIsActiveQuery = (
  options?: Omit<
    UseQueryOptions<IIsActive, AxiosError, IIsActive>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IIsActive, AxiosError, IIsActive>(
    "isActive",
    async () => {
      const res = await axios.get<IIsActive>(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/active`
      );

      return res.data;
    },
    options
  );

export const useAvatarQuery = (
  options?: Omit<
    UseQueryOptions<IAvatar, AxiosError, IAvatar>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IAvatar, AxiosError, IAvatar>(
    "avatar",
    async () => {
      const res = await axios.get<IAvatar>(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/avatar`
      );
      return res.data;
    },
    options
  );

// export interface IRate {
//   name: string;
//   cnt: number;
// }
interface IComment {
  comments: IUserComment[];
}

interface IIsActive {
  isActive: {
    isActive: boolean;
    _id: string;
  };
}
