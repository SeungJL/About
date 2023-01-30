import axios, { AxiosError, AxiosResponse } from "axios";
import { Dayjs } from "dayjs";
import { useQuery, UseQueryOptions } from "react-query";
import { PLACE_FINDALL, VOTE_GET } from "../../libs/queryKeys";
import { IPlace } from "../../models/place";
import { IVote } from "../../models/vote";

export const useVoteQuery = (
  date: Dayjs,
  options?: Omit<
    UseQueryOptions<IVote, AxiosError, IVote, [string, Dayjs]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IVote, AxiosError, IVote, [string, Dayjs]>(
    [VOTE_GET, date],

    async () => {
      const res = await axios.get<IVote>(
        `/api/vote/${date.format("YYYY-MM-DD")}`
      );
      return res.data;
    },
    options
  );

export const usePlaceQuery = (
  options?: Omit<
    UseQueryOptions<IPlace[], AxiosError, IPlace[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IPlace[], AxiosError, IPlace[]>(
    PLACE_FINDALL,
    async () => {
      const res = await axios.get<IPlace[]>(`/api/place`);
      return res.data;
    },
    options
  );
