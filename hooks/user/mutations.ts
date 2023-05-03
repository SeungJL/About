import axios, { Axios, AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { IAvatar, IUserComment } from "../../types/user";
import { IApplyRest } from "../../types/userAction";

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
  options?: Omit<
    UseMutationOptions<void, AxiosError, IUserComment>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IUserComment>(async (comments) => {
    await axios.post("/api/user/comment", {
      comment: comments.comment,
      _id: comments._id,
    });
  }, options);

export const useApplyRestMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IApplyRest>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IApplyRest>(async (info) => {
    await axios.post("/api/user/rest", {
      info,
    });
  }, options);

export const useAvatarMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IAvatar>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IAvatar>(async (info) => {
    await axios.post("/api/user/avatar", info);
  }, options);
