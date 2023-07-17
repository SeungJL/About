import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { IStoreApplicant } from "../../types/page/store";

interface IStoreQuery {
  users: IStoreApplicant[];
}

export const useStoreQuery = (
  giftId: number,
  options?: Omit<
    UseQueryOptions<IStoreQuery, AxiosError, IStoreQuery>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IStoreQuery, AxiosError, IStoreQuery>(
    ["storeGift", giftId],
    async () => {
      const res = await axios.get<IStoreQuery>(`/api/store/${giftId}`);
      return res.data;
    },
    options
  );

export const useStoreAllQuery = (
  options?: Omit<
    UseQueryOptions<IStoreQuery, AxiosError, IStoreQuery>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IStoreQuery, AxiosError, IStoreQuery>(
    "storeGiftAll",
    async () => {
      const res = await axios.get<IStoreQuery>(`/api/store`);
      return res.data;
    },
    options
  );
