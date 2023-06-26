import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useQueries, useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";

import {
  USER_COMMENT,
  USER_FINDPARTICIPATION,
  USER_FINDVOTE,
  USER_FINDVOTES,
  USER_FINFACTIVE,
} from "../../libs/queryKeys";
import { IVoteRate } from "../../types/studyRecord";
import { IAvatar, IRegisterForm, IUser, IUserComment } from "../../types/user";
import { IDateStartToEnd } from "../../types/utils";

export const useRegisterFormsQuery = (
  options?: Omit<
    UseQueryOptions<IRegisterForm[], AxiosError, IRegisterForm[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IRegisterForm[], AxiosError, IRegisterForm[]>(
    "registerForms",
    async () => {
      const res = await axios.get<IRegisterForm[]>(`${SERVER_URI}/register`);
      return res.data;
    },
    options
  );

export const useUserInfoQuery = (
  options?: Omit<
    UseQueryOptions<IUser, AxiosError, IUser>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IUser, AxiosError, IUser>(
    USER_FINFACTIVE,
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
      return res.data;
    },
    options
  );

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

export const useUserCommentQuery = (
  options?: Omit<
    UseQueryOptions<IComment, AxiosError, IComment>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IComment, AxiosError, IComment>(
    USER_COMMENT,
    async () => {
      const res = await axios.get<IComment>(`${SERVER_URI}/user/comment`);
      return res.data;
    },
    options
  );

export const useUserIsActiveQuery = (
  options?: Omit<
    UseQueryOptions<IIsActive, AxiosError, IIsActive>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IIsActive, AxiosError, IIsActive>(
    "isActive",
    async () => {
      const res = await axios.get<IIsActive>(`${SERVER_URI}/user/active`);

      return res.data;
    },
    options
  );

export const useUserAvatarQuery = (
  options?: Omit<
    UseQueryOptions<IAvatar, AxiosError, IAvatar>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IAvatar, AxiosError, IAvatar>(
    "avatar",
    async () => {
      const res = await axios.get<IAvatar>(`${SERVER_URI}/user/avatar`);
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
