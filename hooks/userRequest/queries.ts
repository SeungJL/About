import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { USER_REQUEST } from "../../libs/queryKeys";
import { IUserRequest, UserRequestCategory } from "../../types/user";

export const useUserRequestQuery = (
  options?: Omit<
    UseQueryOptions<IUserRequest[], AxiosError, IUserRequest[]>,
    "queryKey" | "queryFn"
  >
) =>
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
  options?: Omit<
    UseQueryOptions<IUserRequest[], AxiosError, IUserRequest[]>,
    "queryKey" | "queryFn"
  >
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
