import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IAvatar, IUserComment, IUserRegister, Role } from "../../types/user";
import { IApplyRest } from "../../types/userRequest";

export const useUserRegisterMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IUserRegister>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IUserRegister>(async (userRegister) => {
    await axios.post(`${SERVER_URI}/register`, userRegister);
  }, options);

export const useUserApproveMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (uid) => {
    console.log({ uid });
    await axios.post(`${SERVER_URI}/register/approval`, { uid });
  }, options)
;
export const useUserDeleteMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (uid) => {
    await axios.delete(`${SERVER_URI}/register/approval`, { data: { uid } });
  }, options);

export const useUserActiveMutation = (
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

export const useUserCommentMutation = (
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

export const useUserApplyRestMutation = (
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

export const useUserAvatarMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IAvatar>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IAvatar>(async (info) => {
    await axios.post(`${SERVER_URI}/user/avatar`, info);
  }, options);

export const useUserRoleMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, Role>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, Role>(async (role) => {
    await axios.patch(`${SERVER_URI}/user/role`, { role });
  }, options);
