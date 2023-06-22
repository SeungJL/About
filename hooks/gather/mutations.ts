import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IGatherContent } from "../../types/gather";

export const useGatherContentMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IGatherContent>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IGatherContent>(async (gather) => {
    const res = await axios.post(`${SERVER_URI}/gather`, { gather });
    return res.data;
  }, options);

export const useGatherParticipate = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (id) => {
    const res = await axios.post(`${SERVER_URI}/gather/participate`, id);
    return res.data;
  }, options);

export const useGatherStatusOpen = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (id) => {
    const res = await axios.patch(`${SERVER_URI}/gather/open`, id);
    return res.data;
  }, options);

export const useGatherStatusClose = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (id) => {
    const res = await axios.patch(`${SERVER_URI}/gather/close`, id);
    return res.data;
  }, options);

export const useGatherStatusEnd = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (id) => {
    const res = await axios.patch(`${SERVER_URI}/gather/end`, id);
    return res.data;
  }, options);
