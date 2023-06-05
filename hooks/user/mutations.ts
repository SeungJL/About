import axios, { Axios, AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IAvatar, IUserComment, IUserRegister } from "../../types/user";
import { IApplyRest } from "../../types/userAction";

export const useRegisterMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IUserRegister>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IUserRegister>(async (userRegister) => {
    const res = await axios.post(`${SERVER_URI}/register`, userRegister);
    return res.data;
  }, options);

export const useApproveMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (uid) => {
    const res = await axios.post(`${SERVER_URI}/register/approval`, uid);
    return res.data;
  }, options);

export const useDeleteRegisterMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (uid) => {
    const res = await axios.delete(`${SERVER_URI}/register/approval`, uid);
    return res.data;
  }, options);

export const useActiveMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, boolean>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, boolean>(async (isActive) => {
    await axios.post(`${SERVER_URI}/user/profile`, {
      isActive,
    });
  }, options);

export const useCommentMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IUserComment>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IUserComment>(async (comments) => {
    await axios.post(`${SERVER_URI}/user/comment`, {
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
    await axios.post(`${SERVER_URI}/user/rest`, {
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
    await axios.post(`${SERVER_URI}/user/avatar`, info);
  }, options);
