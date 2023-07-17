import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IPointSystem } from "../../types/user/pointSystem";

export const useUpdateProfileMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (profile) => {
    await axios.post(`${SERVER_URI}/admin/user`, {
      profile,
    });
  }, options);

export const useAdminPointMutation = (
  uid: string,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPointSystem>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPointSystem>(async (data) => {
    await axios.post(`${SERVER_URI}/admin/user/${uid}/point`, data);
  }, options);

export const useAdminScoremMutation = (
  uid: string,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPointSystem>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPointSystem>(async (data) => {
    await axios.post(`${SERVER_URI}/admin/user/${uid}/score`, data);
  }, options);

export const useAdminDepositMutation = (
  uid: string,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPointSystem>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPointSystem>(async (data) => {
    await axios.post(`${SERVER_URI}/admin/user/${uid}/deposit`, data);
  }, options);
