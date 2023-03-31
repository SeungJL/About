import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useMutation, UseMutationOptions } from "react-query";
import { IUserRegister } from "../../recoil/user";
import { IVoteStudyInfo } from "../../types/statistics";

export const useAttendMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IVoteStudyInfo>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IVoteStudyInfo>(async (voteInfos) => {
    await axios.post(
      `/api/vote/${currentDate.format("YYYY-MM-DD")}`,
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
    await axios.delete(`/api/vote/${currentDate.format("YYYY-MM-DD")}`);
  }, options);

export const useChangeTimeMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, { start: Dayjs; end: Dayjs }>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, { start: Dayjs; end: Dayjs }>(async (time) => {
    await axios.patch(`/api/vote/${date.format("YYYY-MM-DD")}`, time);
  }, options);

export const useConfirmMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`/api/vote/${currentDate.format("YYYY-MM-DD")}/confirm`);
  }, options);

export const useDismissMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`/api/vote/${currentDate.format("YYYY-MM-DD")}/dismiss`);
  }, options);

export const useArrivedMutation = (
  currentDate: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (memo: string) => {
    await axios.patch(`/api/vote/${currentDate.format("YYYY-MM-DD")}/arrived`, {
      memo,
    });
  }, options);

export const useRegisterMutation = (
  options?: Omit<
    UseMutationOptions<any, AxiosError, IUserRegister>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<any, AxiosError, IUserRegister>(async (userRegister) => {
    const res = await axios.post(`/api/user/profile`, userRegister);
    return res.data;
  }, options);

export const useDecideSpaceMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation("decideSpace", async () => {
    const res = await axios.patch<void>(
      `/api/admin/vote/${date.format("YYYY-MM-DD")}/status/confirm`
    );
    return res.data;
  });
