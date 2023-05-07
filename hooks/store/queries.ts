import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

export const useStoreQuery = (
  giftId?: number,
  options?: Omit<UseQueryOptions<any, AxiosError, any>, "queryKey" | "queryFn">
) =>
  useQuery<any, AxiosError, any>(
    "storeGift",
    async () => {
      console.log(giftId);
      const res = await axios.get<any>(`/api/store/${giftId}`);
      return res.data;
    },
    options
  );
