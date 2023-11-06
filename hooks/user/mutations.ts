import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IApplyRest } from "../../modals/userRequest/RequestRestModal/RequestRestModal";
import { MutationOptions } from "../../types/reactTypes";
import { IAvatar, IUser2, IUserRegister, Role } from "../../types/user/user";
import { IUserRequest } from "../../types/user/userRequest";

export const useUserRegisterMutation = (
  options?: MutationOptions<IUserRegister>
) =>
  useMutation<void, AxiosError, IUserRegister>(async (userRegister) => {
    await axios.post(`${SERVER_URI}/register`, userRegister);
  }, options);

export const useUserApproveMutation = (options?: MutationOptions<string>) =>
  useMutation<void, AxiosError, string>(async (uid) => {
    await axios.post(`${SERVER_URI}/register/approval`, { uid });
  }, options);

export const useUserDeleteMutation = (options?: MutationOptions<string>) =>
  useMutation<void, AxiosError, string>(async (uid) => {
    await axios.delete(`${SERVER_URI}/register/approval`, { data: { uid } });
  }, options);

export const useUserInfoMutation = (options?: MutationOptions<IUser2>) =>
  useMutation<void, AxiosError, IUser2>(async (userInfo) => {
    await axios.post(`${SERVER_URI}/user/profile`, userInfo);
  }, options);

export const useUserAvatarMutation = (options?: MutationOptions<IAvatar>) =>
  useMutation<void, AxiosError, IAvatar>(async (avatar) => {
    await axios.post(`${SERVER_URI}/user/avatar`, avatar);
  }, options);

export const useUserRoleMutation = (options?: MutationOptions<Role>) =>
  useMutation<void, AxiosError, Role>(async (role) => {
    await axios.patch(`${SERVER_URI}/user/role`, { role });
  }, options);

export const useUserApplyRestMutation = (
  options?: MutationOptions<IApplyRest>
) =>
  useMutation<void, AxiosError, IApplyRest>(async (info) => {
    console.log(2, { info });
    await axios.post(`${SERVER_URI}/user/rest`, {
      info,
    });
  }, options);

export const useUserRequestMutation = (
  options?: MutationOptions<IUserRequest>
) =>
  useMutation<void, AxiosError, IUserRequest>(async (request) => {
    console.log(request);
    const res = await axios.post(`${SERVER_URI}/request`, { request });
    return res.data;
  }, options);

export const useUserUpdateProfileImageMutation = (
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch("/api/user/profile");
  }, options);

// export const useUserCommentMutation = (
//   options?: Omit<
//     UseMutationOptions<void, AxiosError, IUserComment>,
//     "mutationKey" | "mutationFn"
//   >
// ) =>
//   useMutation<void, AxiosError, IUserComment>(async (comment) => {
//
//     await axios.post(`${SERVER_URI}/user/comment`, {
//       comment,
//     });
//   }, options);
