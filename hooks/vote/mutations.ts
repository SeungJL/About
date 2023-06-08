import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";

import { IVoteStudyInfo } from "../../types/statistics";
import { IAbsentInfo } from "../../types/userAction";

export const useAttendMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IVoteStudyInfo>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IVoteStudyInfo>(async (voteInfos) => {
    await axios.post(
      `${SERVER_URI}/vote/${currentDate.format("YYYY-MM-DD")}`,
      voteInfos
    );
  }, options);

export const useAbsentMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.delete(
      `${SERVER_URI}/vote/${currentDate.format("YYYY-MM-DD")}`
    );
  }, options);

export const useChangeTimeMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, { start: Dayjs; end: Dayjs }>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, { start: Dayjs; end: Dayjs }>(async (time) => {
    await axios.patch(`${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}`, time);
  }, options);

export const useConfirmMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(
      `${SERVER_URI}/vote/${currentDate.format("YYYY-MM-DD")}/confirm`
    );
  }, options);

export const useDismissMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(
      `${SERVER_URI}/vote/${currentDate.format("YYYY-MM-DD")}/dismiss`
    );
  }, options);

export const useArrivedMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (memo: string) => {
    await axios.patch(
      `${SERVER_URI}/vote/${currentDate.format("YYYY-MM-DD")}/arrived`,
      {
        memo,
      }
    );
  }, options);

export const useDecideSpaceMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation(async () => {
    const res = await axios.patch<void>(
      `${SERVER_URI}/admin/vote/${date.format("YYYY-MM-DD")}/status/confirm`
    );
    return res.data;
  });

export const useAbsentStudyMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IAbsentInfo>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation(async (absentInfo) => {
    const res = await axios.post(
      `${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}/absence`,
      absentInfo
    );
    return res.data;
  }, options);
