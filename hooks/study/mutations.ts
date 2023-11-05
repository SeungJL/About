import { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useMutation, UseMutationOptions } from "react-query";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { requestServer } from "../../helpers/methodHelpers";
import { MutationOptions } from "../../types/reactTypes";
import { IStudyParticipate, IStudyPlaces } from "../../types/study/study";

import { IDayjsStartToEnd } from "../../types/timeAndDate";

type StudyParticipationParam<T> = T extends "post"
  ? IStudyParticipate
  : T extends "patch"
  ? IDayjsStartToEnd
  : void;

export const useStudyParticipationMutation = <
  T extends "post" | "patch" | "delete"
>(
  date: Dayjs,
  method: T,
  options?: MutationOptions<StudyParticipationParam<T>>
) =>
  useMutation<void, AxiosError, StudyParticipationParam<T>>(
    (param) =>
      requestServer<StudyParticipationParam<T>>({
        method,
        url: `vote/${dayjsToStr(date)}`,
        body: param,
      }),
    options
  );

interface IStudyQuickVoteParam {
  start: Dayjs;
  end: Dayjs;
}

export const useStudyQuickVoteMutation = (
  date: Dayjs,
  options?: MutationOptions<IStudyQuickVoteParam>
) =>
  useMutation<void, AxiosError, IStudyQuickVoteParam>(
    ({ start, end }) =>
      requestServer<IStudyQuickVoteParam>({
        method: "post",
        url: `vote/${dayjsToStr(date)}/quick`,
        body: { start, end },
      }),
    options
  );

export const useStudyOpenFreeMutation = (
  date: Dayjs,
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(
    (placeId) =>
      requestServer<string>({
        method: "patch",
        url: `vote/${dayjsToStr(date)}/free`,
        body: placeId,
      }),
    options
  );

export const useStudyArrivedMutation = (
  date: Dayjs,
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(
    (memo) =>
      requestServer<string>({
        method: "patch",
        url: `vote/${dayjsToStr(date)}/arrived`,
        body: memo,
      }),
    options
  );

export const useStudyAbsentMutation = (
  date: Dayjs,
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(
    (message) =>
      requestServer<string>({
        method: "post",
        url: `vote/${dayjsToStr(date)}/absence`,
        body: message,
      }),
    options
  );

export const useStudyResultDecideMutation = (
  date: Dayjs,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(
    () =>
      requestServer<void>({
        method: "patch",
        url: `admin/vote/${dayjsToStr(date)}/status/confirm`,
      }),
    options
  );

export const useStudyPreferenceMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IStudyPlaces>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation<void, AxiosError, IStudyPlaces>(
    (votePlaces) =>
      requestServer<IStudyPlaces>({
        method: "post",
        url: `user/preference`,
        body: votePlaces,
      }),
    options
  );
