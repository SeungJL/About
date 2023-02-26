import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import {
  USER_FINDPARTICIPATION,
  USER_FINDVOTE,
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
  options?: Omit<UseQueryOptions<any, AxiosError, any>, "queryKey" | "queryFn">
) =>
  useQuery<any, AxiosError, any>(
    USER_FINDPARTICIPATION,
    async () => {
      const res = await axios.get(`/api/user/participationrate`);
    },
    options
  );

export const useVoteRateQuery = (
  options?: Omit<UseQueryOptions<any, AxiosError, any>, "queryKey" | "queryFn">
) =>
  useQuery<any, AxiosError, any>(
    USER_FINDVOTE,
    async () => {
      const res = await axios.get(`/api/user/voterate`);
    },
    options
  );
