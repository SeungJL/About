import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../../constants/system";
import { IPointSystem, IScore } from "../../../types/user/scoreSystem";

export const useScoreMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPointSystem>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPointSystem>(async ({ value, message }) => {
    await axios.post(`${SERVER_URI}/user/score`, { score: value, message });
  }, options);

export const usePointMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPointSystem>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPointSystem>(async ({ value, message }) => {
    await axios.post(`${SERVER_URI}/user/point`, { point: value, message });
  }, options);

export const useDepositMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPointSystem>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPointSystem>(async ({ value, message }) => {
    await axios.post(`${SERVER_URI}/user/deposit`, { deposit: value, message });
  }, options);
