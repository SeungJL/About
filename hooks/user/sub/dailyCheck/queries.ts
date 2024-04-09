import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { SERVER_URI } from "../../../../constants/system";
import { IDailyCheck } from "../../../../types/components/modal/attendCheck";
import { QueryOptions } from "../../../../types/hooks/reactTypes";

export const useDailyCheckQuery = (options?: QueryOptions<IDailyCheck[]>) =>
  useQuery<IDailyCheck[], AxiosError, IDailyCheck[]>(
    "dailyCheck",
    async () => {
      const res = await axios.get<IDailyCheck[]>(`${SERVER_URI}/dailyCheck`);
      return res.data;
    },
    { ...options, staleTime: 0, cacheTime: 0 }
  );
