import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { USER_REQUEST } from "../../libs/queryKeys";
import { IUserRequest } from "../../types/user";

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
