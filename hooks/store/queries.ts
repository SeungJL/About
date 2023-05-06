import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

export const useStoreQuery = (
  options?: Omit<UseQueryOptions<any, AxiosError, any>, "queryKey" | "queryFn">
) =>
  useQuery<any, AxiosError, any>(
    "storeGift",
    async () => {
      const res = await axios.get<any>("/api/store");
      return res.data;
    },
    options
  );
