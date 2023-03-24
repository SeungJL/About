import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

export const useActiveMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, boolean>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, boolean>(async (isActive) => {
    await axios.post(`/api/user/profile`, { isActive });
  }, options);

export const useCommentMutation = (
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
