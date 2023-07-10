import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";

import { USER_COMMENT, USER_FINFACTIVE } from "../../libs/queryKeys";
import { Location } from "../../types/system";
import {
  IAvatar,
  IRegisterForm,
  IUser,
  IUserComment,
  Role,
} from "../../types/user";

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
    [USER_FINFACTIVE, "userInfo"],
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
      return res.data;
    },
    options
  );
export const useUserRoleQuery = (
  options?: Omit<
    UseQueryOptions<Role, AxiosError, Role>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<Role, AxiosError, Role>(
    [USER_FINFACTIVE, "userRole"],
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
      return res.data.role;
    },
    options
  );

export const useUserLocationQuery = (
  options?: Omit<
    UseQueryOptions<Location, AxiosError, Location>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<Location, AxiosError, Location>(
    [USER_FINFACTIVE, "userLocation"],
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
      return res.data.location;
    },
    options
  );

interface IComment {
  comments: IUserComment[];
}

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
interface IIsActive {
  isActive: {
    isActive: boolean;
    _id: string;
  };
}
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
