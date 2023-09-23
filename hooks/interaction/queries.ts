import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IInteractionGetLike } from "../../types/interaction";

export const useInteractionLikeQuery = (
  options?: Omit<
    UseQueryOptions<IInteractionGetLike[], AxiosError, IInteractionGetLike[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IInteractionGetLike[], AxiosError, IInteractionGetLike[]>(
    "userInteraction",
    async () => {
      const res = await axios.get<IInteractionGetLike[]>(
        `${SERVER_URI}/notice/like`
      );
      return res.data;
    },
    options
  );
