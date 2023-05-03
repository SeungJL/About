import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { IScore } from "../../../types/user/scoreSystem";

export const useScoreMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, number>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, number>(async (cnt) => {
    await axios.post("/api/user/score", { score: cnt });
  }, options);

export const usePointMutation = (
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

export const useDepositMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, number>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, number>(async (cnt) => {
    await axios.post("/api/user/deposit", {
      deposit: cnt,
    });
  }, options);
