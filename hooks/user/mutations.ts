import axios, { Axios, AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { IUserComment, IWarningScore } from "../../types/user";
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

export const useWarningScoreMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IWarningScore>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IWarningScore>(async (data) => {
    await axios.post("/api/user/score", {
      data,
    });
  }, options);

export const useScoreMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, number>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, number>(async (cnt) => {
    await axios.post("/api/user/point", {
      point: cnt,
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
