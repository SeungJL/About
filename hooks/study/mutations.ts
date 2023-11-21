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
  voteDate: Dayjs,
  method: T,
  options?: MutationOptions<StudyParticipationParam<T>>
) =>
  useMutation<void, AxiosError, StudyParticipationParam<T>>((param) => {
    const voteInfo = param;
    if (method !== "delete") {
      const updatedVoteInfo = voteInfo as IStudyParticipate | IDayjsStartToEnd;
      const { start, end } = updatedVoteInfo;
      updatedVoteInfo.start = voteDate
        .hour(start.hour())
        .minute(start.minute());
      updatedVoteInfo.end = voteDate.hour(end.hour()).minute(end.minute());
    }
    return requestServer<StudyParticipationParam<T>>({
      method,
      url: `vote/${dayjsToStr(voteDate)}`,
      body: voteInfo,
    });
  }, options);

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
      requestServer<{ placeId: string }>({
        method: "patch",
        url: `vote/${dayjsToStr(date)}/free`,
        body: { placeId },
      }),
    options
  );

export const useStudyArrivedMutation = (
  date: Dayjs,
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(
    (memo) =>
      requestServer<{ memo: string }>({
        method: "patch",
        url: `vote/${dayjsToStr(date)}/arrived`,
        body: { memo },
      }),
    options
  );

export const useStudyAbsentMutation = (
  date: Dayjs,
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(
    (message) =>
      requestServer<{ message: string }>({
        method: "post",
        url: `vote/${dayjsToStr(date)}/absence`,
        body: { message },
      }),
    options
  );

export const useStudyResultDecideMutation = (
  date: Dayjs,
  options?: MutationOptions<void>
) =>
  useMutation<any, AxiosError, void>(
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
