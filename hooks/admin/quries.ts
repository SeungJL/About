import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import {
  USER_REGISTER_FORM,
  USER_REQUEST,
} from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { QueryOptions } from "../../types/reactTypes";
import { IUser, IUserRegisterForm } from "../../types/user/user";
import {
  IUserRequest,
  UserRequestCategory,
} from "../../types/user/userRequest";

export const useAdminUsersControlQuery = (options?: QueryOptions<IUser[]>) =>
  useQuery<IUser[], AxiosError, IUser[]>(
    "adminUserControl",
    async () => {
      const res = await axios.get<IUser[]>(`${SERVER_URI}/admin/user`);
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

export const useUserRegisterFormsQuery = (
  options?: QueryOptions<IUserRegisterForm[]>
) =>
  useQuery<IUserRegisterForm[], AxiosError, IUserRegisterForm[]>(
    [USER_REGISTER_FORM],
    async () => {
      const res = await axios.get<IUserRegisterForm[]>(
        `${SERVER_URI}/register`
      );
      return res.data;
    },
    options
  );
