import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { requestServer } from "../../helpers/methodHelpers";
import { MutationOptions } from "../../types/reactTypes";
import { IPointSystem } from "../../types/user/pointSystem";

export const useUpdateProfileMutation = (options?: MutationOptions<any>) =>
  useMutation<void, AxiosError, any>(async (profile) => {
    await axios.post(`${SERVER_URI}/admin/user`, {
      profile,
    });
  }, options);

export const useAdminAboutPointMutation = (
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

export const useVoteStatusResetMutation = (options?: MutationOptions<Dayjs>) =>
  useMutation<void, AxiosError, Dayjs>(
    (date: Dayjs) =>
      requestServer<Dayjs>({
        method: "patch",
        url: `admin/vote/${dayjsToStr(date)}/reset`,
      }),
    options
  );
