import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { IStoreApplicant } from "../../types/store";

interface IStoreQuery {
  users: IStoreApplicant[];
}

export const useStoreQuery = (
  giftId?: number,
  options?: Omit<
    UseQueryOptions<IStoreQuery, AxiosError, IStoreQuery>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IStoreQuery, AxiosError, IStoreQuery>(
    ["storeGift"],
    async () => {
      const res = await axios.get<IStoreQuery>(`/api/store/${giftId}`);
      return res.data;
    },

    options
  );
