import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { SERVER_URI } from "../../../../constants/system";
import { IDailyCheck } from "../../../../types2/modal/attendCheck";
import { QueryOptions } from "../../../../types2/reactTypes";

export const useDailyCheckQuery = (options?: QueryOptions<IDailyCheck[]>) =>
  useQuery<IDailyCheck[], AxiosError, IDailyCheck[]>(
    "dailyCheck",
    async () => {
      const res = await axios.get<IDailyCheck[]>(`${SERVER_URI}/dailyCheck`);
      return res.data;
    },
    { ...options, staleTime: 0, cacheTime: 0 }
  );
