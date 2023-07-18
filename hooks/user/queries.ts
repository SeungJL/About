import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { USER_INFO, USER_REQUEST } from "../../constants/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { QueryOptions } from "../../types/reactTypes";
import { Location } from "../../types/system";
import {
  IAvatar,
  IIsActive,
  IRegisterForm,
  IUser,
  Role,
} from "../../types/user/user";
import {
  IUserRequest,
  UserRequestCategory,
} from "../../types/user/userRequest";

export const useUserInfoQuery = (options?: QueryOptions<IUser>) =>
  useQuery<IUser, AxiosError, IUser>(
    [USER_INFO],
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
      return res.data;
    },
    options
  );

export const useUserRoleQuery = (options?: QueryOptions<Role>) =>
  useQuery<Role, AxiosError, Role>(
    [USER_INFO, "userRole"],
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
      return res.data.role;
    },
    options
  );

export const useUserLocationQuery = (options?: QueryOptions<Location>) =>
  useQuery<Location, AxiosError, Location>(
    [USER_INFO, "userLocation"],
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
      return res.data.location;
    },
    options
  );

export const useUserIsActiveQuery = (options?: QueryOptions<IIsActive>) =>
  useQuery<IIsActive, AxiosError, IIsActive>(
    "isActive",
    async () => {
      const res = await axios.get<IIsActive>(`${SERVER_URI}/user/active`);

      return res.data;
    },
    options
  );

export const useUserAvatarQuery = (options?: QueryOptions<IAvatar>) =>
  useQuery<IAvatar, AxiosError, IAvatar>(
    "avatar",
    async () => {
      const res = await axios.get<IAvatar>(`${SERVER_URI}/user/avatar`);
      return res.data;
    },
    options
  );

export const useRegisterFormsQuery = (
  options?: QueryOptions<IRegisterForm[]>
) =>
  useQuery<IRegisterForm[], AxiosError, IRegisterForm[]>(
    "registerForms",
    async () => {
      const res = await axios.get<IRegisterForm[]>(`${SERVER_URI}/register`);
      return res.data;
    },
    options
  );
export const useUserRequestQuery = (options?: QueryOptions<IUserRequest[]>) =>
  useQuery<IUserRequest[], AxiosError, IUserRequest[]>(
    USER_REQUEST,
    async () => {
      const res = await axios.get<IUserRequest[]>(`${SERVER_URI}/plaza`);
      return res.data;
    },
    options
  );

export const useUserRequestCategoryQuery = (
  category: UserRequestCategory,
  options?: QueryOptions<IUserRequest[]>
) =>
  useQuery<IUserRequest[], AxiosError, IUserRequest[]>(
    [USER_REQUEST, category],
    async () => {
      const res = await axios.get<IUserRequest[]>(`${SERVER_URI}/plaza`);
      const filterData = res.data.filter((item) => item.category === category);
      return filterData;
    },
    options
  );

// interface IComment {
//   comments: IUserComment[];
// }

// export const useUserCommentQuery = (
//   options?: Omit<
//     UseQueryOptions<IComment, AxiosError, IComment>,
//     "queryKey" | "queryFn"
//   >
// ) =>
//   useQuery<IComment, AxiosError, IComment>(
//     USER_COMMENT,
//     async () => {
//       const res = await axios.get<IComment>(`${SERVER_URI}/user/comment`);
//       return res.data;
//     },
//     options
//   );
