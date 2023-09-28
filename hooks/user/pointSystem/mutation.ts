import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../../constants/system";
import { MutationOptions } from "../../../types/reactTypes";
import { IPointSystem } from "../../../types/user/pointSystem";

export const useAboutPointMutation = (
  options?: MutationOptions<IPointSystem>
) =>
  useMutation<void, AxiosError, IPointSystem>(async ({ value, message }) => {
    await axios.post(`${SERVER_URI}/user/score`, { score: value, message });
    await axios.post(`${SERVER_URI}/user/point`, { score: value, message });
  }, options);

export const useScoreMutation = (options?: MutationOptions<IPointSystem>) =>
  useMutation<void, AxiosError, IPointSystem>(async ({ value, message }) => {
    await axios.post(`${SERVER_URI}/user/score`, { score: value, message });
  }, options);

export const usePointMutation = (options?: MutationOptions<IPointSystem>) =>
  useMutation<void, AxiosError, IPointSystem>(async ({ value, message }) => {
    await axios.post(`${SERVER_URI}/user/point`, { point: value, message });
  }, options);

export const useDepositMutation = (options?: MutationOptions<IPointSystem>) =>
  useMutation<void, AxiosError, IPointSystem>(async ({ value, message }) => {
    await axios.post(`${SERVER_URI}/user/deposit`, { deposit: value, message });
  }, options);
