import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { IUser } from "../../types/user";

export const useAdminUsersControlQuery = (
  options?: Omit<
    UseQueryOptions<IUser[], AxiosError, IUser[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IUser[], AxiosError, IUser[]>(
    "adminUserControl",
    async () => {
      const res = await axios.get<IUser[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/admin/user`
      );
      return res.data;
    },
    options
  );
