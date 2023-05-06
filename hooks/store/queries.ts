import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

export const useStoreQuery = (
  giftid?: string,
  options?: Omit<UseQueryOptions<any, AxiosError, any>, "queryKey" | "queryFn">
) =>
  useQuery<any, AxiosError, any>(
    "storeGift",
    async () => {
      console.log(giftid);
      const res = await axios.get<any>(`/api/store/${giftid}`);
      return res.data;
    },
    options
  );
