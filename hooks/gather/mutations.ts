import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IGatherCommentUnit } from "../../pagesComponents/gather/detail/GatherComment";
import { IGatherContent, ParticipationPhase } from "../../types/page/gather";

export const useGatherContentMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IGatherContent>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IGatherContent>(async (gather) => {
    await axios.post(`${SERVER_URI}/gather`, { gather });
  }, options);

export const useGatherDeleteMutation = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.delete(`${SERVER_URI}/gather`, { data: { gatherId } });
  }, options);

export const useGatherParticipateMutation = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, ParticipationPhase>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, ParticipationPhase>(async (phase) => {
    await axios.post(`${SERVER_URI}/gather/participate`, {
      gatherId,
      phase,
    });
  }, options);

export const useGatherCancelMutation = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.delete(`${SERVER_URI}/gather/participate`, {
      data: { gatherId },
    });
  }, options);

export const useGatherStatusOpen = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`${SERVER_URI}/gather/open`, { gatherId });
  }, options);

export const useGatherStatusClose = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`${SERVER_URI}/gather/close`, { gatherId });
  }, options);

export const useGatherStatusEnd = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`${SERVER_URI}/gather/end`, { gatherId });
  }, options);

export const useGatherCommentMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IGatherCommentUnit>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IGatherCommentUnit>(async (comment) => {
    await axios.post(`${SERVER_URI}/gather/comment`, comment);
  }, options);

export const useGatherCommentDeleteMutation = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (commentId) => {
    await axios.delete(`${SERVER_URI}/gather/comment`, {
      data: { gatherId, commentId },
    });
  }, options);
export const useGatherCommentEditMutation = (
  gatherId: number,
  options?: Omit<
    UseMutationOptions<void, AxiosError, [string, string]>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, [string, string]>(
    async ([commentId, comment]) => {
      await axios.patch(`${SERVER_URI}/gather/comment`, {
        gatherId,
        commentId,
        comment,
      });
    },
    options
  );
