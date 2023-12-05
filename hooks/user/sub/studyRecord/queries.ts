import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useQuery } from "react-query";

import {
  USER_ATTEND_RATE,
  USER_FINDPARTICIPATION,
} from "../../../../constants/keys/queryKeys";
import { SERVER_URI } from "../../../../constants/system";
import { dayjsToStr } from "../../../../helpers/dateHelpers";
import { QueryOptions } from "../../../../types/reactTypes";
import { IVoteRate } from "../../../../types/study/study";
import { IDayjsStartToEnd } from "../../../../types/timeAndDate";
type UserAttendRateReturn<T> = T extends true ? IVoteRate : IVoteRate[];

export const useUserAttendRateQuery = <T extends boolean>(
  startDay: Dayjs,
  endDay: Dayjs,
  isUserScope: T = true as T,
  options?: QueryOptions<UserAttendRateReturn<T>>
) =>
  useQuery<UserAttendRateReturn<T>, AxiosError, UserAttendRateReturn<T>>(
    [USER_ATTEND_RATE, dayjsToStr(startDay), dayjsToStr(endDay)],
    async () => {
      const scopeQuery = isUserScope ? "" : "all";
      const res = await axios.get<UserAttendRateReturn<T>>(
        `${SERVER_URI}/user/participationrate/${scopeQuery}`,
        {
          params: {
            startDay: startDay.format("YYYY-MM-DD"),
            endDay: endDay.format("YYYY-MM-DD"),
          },
        }
      );
      return res.data;
    },
    options
  );

type UserAttendRatesGet<T> = T extends true ? IVoteRate : IVoteRate[];
type UserAttendRatesReturn<T> = T extends true ? number[] : IVoteRate[][];

export const useUserAttendRateQueries = <T extends boolean>(
  monthList: IDayjsStartToEnd[],
  isUserScope: T = true as T,
  options?: QueryOptions<UserAttendRatesReturn<T>>
) => {
  const scopeQuery = isUserScope ? "" : "all";
  const queryFn = async (month: IDayjsStartToEnd) => {
    const res = await axios.get<UserAttendRatesGet<T>>(
      `${SERVER_URI}/user/participationrate/${scopeQuery}`,
      {
        params: {
          startDay: month.start.format("YYYY-MM-DD"),
          endDay: month.end.format("YYYY-MM-DD"),
        },
      }
    );
    if (isUserScope) return (res.data as IVoteRate).cnt;
    return res.data as IVoteRate[];
  };
  const queryFns = monthList.map((month) => queryFn(month));
  return useQuery(
    [USER_FINDPARTICIPATION, isUserScope],
    async () => {
      const results = await Promise.all(queryFns);
      return results;
    },
    options
  );
};
