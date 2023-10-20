import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { STORE_GIFT } from "../../constants/keys/queryKeys";
import { IStoreQuery } from "../../types/page/store";
import { QueryOptions } from "../../types/reactTypes";

export const useStoreGiftQuery = (
  giftId: number,
  options?: QueryOptions<IStoreQuery>
) =>
  useQuery<IStoreQuery, AxiosError, IStoreQuery>(
    ["storeGift", giftId],
    async () => {
      const res = await axios.get<IStoreQuery>(`/api/store/${giftId}`);
      return res.data;
    },
    options
  );

export const useStoreGiftEntryQuery = (options?: QueryOptions<IStoreQuery>) =>
  useQuery<IStoreQuery, AxiosError, IStoreQuery>(
    STORE_GIFT,
    async () => {
      const res = await axios.get<IStoreQuery>(`/api/store`);
      return res.data;
    },
    options
  );
