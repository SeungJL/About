import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { SERVER_URI } from "../../../../constants/system";
import { IDailyCheck } from "../../../../types/modal/attendCheck";
import { QueryOptions } from "../../../../types/reactTypes";

export const useDailyCheckAllQuery = (options?: QueryOptions<IDailyCheck[]>) =>
  useQuery<IDailyCheck[], AxiosError, IDailyCheck[]>(
    "dailyCheck",
    async () => {
      const res = await axios.get<IDailyCheck[]>(
        `${SERVER_URI}/dailyCheck/all`
      );
      return res.data;
    },
    { ...options, staleTime: 0, cacheTime: 0 }
  );
