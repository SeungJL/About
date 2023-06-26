import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IGatherCommentUnit } from "../../pagesComponents/Gather/Detail/GatherComment";
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

export const useGatherDeleteMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (gatherId) => {
    console.log(gatherId);
    await axios.delete(`${SERVER_URI}/gather`, { data: gatherId });
  }, options);

export const useGatherParticipateMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (gatherId) => {
    const res = await axios.post(`${SERVER_URI}/gather/participate`, gatherId);
    return res.data;
  }, options);

export const useGatherCancelMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (gatherId) => {
    await axios.delete(`${SERVER_URI}/gather/participate`, {
      data: gatherId,
    });
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

export const useGatherCommentMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IGatherCommentUnit>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IGatherCommentUnit>(async (comment) => {
    console.log(comment);
    const res = await axios.post(`${SERVER_URI}/gather/comment`, comment);

    return res.data;
  }, options);
