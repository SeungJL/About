import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { SERVER_URI } from "../../constants/url";
import { QueryOptions } from "../../types/reactTypes";
import { IUser } from "../../types/user/user";

export const useAdminUsersControlQuery = (options?: QueryOptions<IUser[]>) =>
  useQuery<IUser[], AxiosError, IUser[]>(
    "adminUserControl",
    async () => {
      const res = await axios.get<IUser[]>(`${SERVER_URI}/admin/user`);
      return res.data;
    },
    options
  );
