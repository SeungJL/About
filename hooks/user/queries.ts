import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { USER_INFO, USER_REQUEST } from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { QueryOptions } from "../../types/reactTypes";
import { IRegisterForm, IUser } from "../../types/user/user";
import {
  IUserRequest,
  UserRequestCategory,
} from "../../types/user/userRequest";

//안됨
export const useUidToUserInfoQuery = (
  uid: string,
  options?: QueryOptions<IUser>
) =>
  useQuery<IUser, AxiosError, IUser>(
    "uidToUserInfo",
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile/${uid}`);
      return res.data;
    },
    options
  );

export const useUserInfoQuery = (options?: QueryOptions<IUser>) =>
  useQuery<IUser, AxiosError, IUser>(
    [USER_INFO],
    async () => {
      const res = await axios.get<IUser>(`${SERVER_URI}/user/profile`);
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

export const useUserRequestQuery = (
  category: UserRequestCategory,
  options?: QueryOptions<IUserRequest[]>
) =>
  useQuery<IUserRequest[], AxiosError, IUserRequest[]>(
    [USER_REQUEST, category],
    async () => {
      const res = await axios.get<IUserRequest[]>(`${SERVER_URI}/request`);
      const filterData = res.data.filter((item) => item.category === category);
      return filterData;
    },
    options
  );
