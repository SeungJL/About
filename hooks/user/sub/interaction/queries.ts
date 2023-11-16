import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { NOTICE_ACTIVE_LOG } from "../../../../constants/keys/queryKeys";
import { SERVER_URI } from "../../../../constants/system";
import { INoticeActiveLog } from "../../../../types/interaction";
import { QueryOptions } from "../../../../types/reactTypes";

export const useNoticeActiveLogQuery = (
  options?: QueryOptions<INoticeActiveLog[]>
) =>
  useQuery<INoticeActiveLog[], AxiosError, INoticeActiveLog[]>(
    [NOTICE_ACTIVE_LOG],
    async () => {
      const res = await axios.get<INoticeActiveLog[]>(`${SERVER_URI}/notice`);
      return res.data;
    },
    options
  );

export const useInteractionLikeQuery = (
  options?: Omit<
    UseQueryOptions<INoticeActiveLog[], AxiosError, INoticeActiveLog[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<INoticeActiveLog[], AxiosError, INoticeActiveLog[]>(
    "userInteraction",
    async () => {
      const res = await axios.get<INoticeActiveLog[]>(
        `${SERVER_URI}/notice/like`
      );
      return res.data;
    },
    options
  );
