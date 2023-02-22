import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { USER_FINFACTIVE } from "../../libs/queryKeys";
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
