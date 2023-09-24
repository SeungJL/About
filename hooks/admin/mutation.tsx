import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { MutationOptions } from "../../types/reactTypes";
import { IPointSystem } from "../../types/user/pointSystem";

export const useUpdateProfileMutation = (options?: MutationOptions<any>) =>
  useMutation<void, AxiosError, any>(async (profile) => {
    await axios.post(`${SERVER_URI}/admin/user`, {
      profile,
    });
  }, options);

export const useAdminAboutPointMutaion = (
  uid: string,
  options?: MutationOptions<IPointSystem>
) =>
  useMutation<void, AxiosError, IPointSystem>(async (data) => {
    await axios.post(`${SERVER_URI}/admin/user/${uid}/point`, data);
    await axios.post(`${SERVER_URI}/admin/user/${uid}/score`, data);
  }, options);

export const useAdminPointMutation = (
  uid: string,
  options?: MutationOptions<IPointSystem>
) =>
  useMutation<void, AxiosError, IPointSystem>(async (data) => {
    await axios.post(`${SERVER_URI}/admin/user/${uid}/point`, data);
  }, options);

export const useAdminScoreMutation = (
  uid: string,
  options?: MutationOptions<IPointSystem>
) =>
  useMutation<void, AxiosError, IPointSystem>(async (data) => {
    await axios.post(`${SERVER_URI}/admin/user/${uid}/score`, data);
  }, options);

export const useAdminDepositMutation = (
  uid: string,
  options?: MutationOptions<IPointSystem>
) =>
  useMutation<void, AxiosError, IPointSystem>(async (data) => {
    await axios.post(`${SERVER_URI}/admin/user/${uid}/deposit`, data);
  }, options);
