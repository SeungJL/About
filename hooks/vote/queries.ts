
import axios, { AxiosError, AxiosResponse } from "axios";
import { Dayjs } from "dayjs";
import { useQuery, UseQueryOptions } from "react-query";
import { VOTE_GET } from "../../libs/queryKeys";
import { IVote } from "../../models/vote";

export const useVoteQuery = (
  date: Dayjs,
  options?: Omit<UseQueryOptions<IVote, AxiosError, IVote, [string, Dayjs]>, 'queryKey' | 'queryFn'>,
) => useQuery<IVote, AxiosError, IVote, [string, Dayjs]>(
  [VOTE_GET, date],
  async () => {
    const res = await axios.get<IVote>(`/api/vote/${date.format('YYYY-MM-DD')}`)
    return res.data
  },
  options,
)