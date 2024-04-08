import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { USER_REQUEST } from "../../../constants/keys/queryKeys";
import { SERVER_URI } from "../../../constants/system";
import { QueryOptions } from "../../../types2/reactTypes";
import { IUserRequest } from "../../../types2/userTypes/userRequestTypes";

export const usePlazaQuery = (options?: QueryOptions<IUserRequest[]>) =>
  useQuery<IUserRequest[], AxiosError, IUserRequest[]>(
    [USER_REQUEST, "plaze"],
    async () => {
      const res = await axios.get<IUserRequest[]>(`${SERVER_URI}/plaza`);
      return res.data;
    },
    options
  );
