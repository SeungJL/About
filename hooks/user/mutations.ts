import axios, { Axios, AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { IUserComment } from "../../types/user";

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

export const useWaringScoreMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, number>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<any, AxiosError, any>(async (cnt) => {
    console.log(34);
    await axios.post("/api/user/score", {
      score: cnt,
    });
  }, options);
