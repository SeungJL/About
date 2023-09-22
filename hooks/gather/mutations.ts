import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../constants/url";
import { IGatherCommentUnit } from "../../pagesComponents/gather/detail/GatherComment";
import { IGatherContent, ParticipationPhase } from "../../types/page/gather";
import { MutationOptions } from "../../types/reactTypes";

/** gather info */
export const useGatherContentMutation = (
  options?: MutationOptions<IGatherContent>
) =>
  useMutation<void, AxiosError, IGatherContent>(async (gather) => {
    await axios.post(`${SERVER_URI}/gather`, { gather });
  }, options);

export const useGatherCommentMutation = (
  options?: MutationOptions<IGatherCommentUnit>
) =>
  useMutation<void, AxiosError, IGatherCommentUnit>(async (comment) => {
    await axios.post(`${SERVER_URI}/gather/comment`, comment);
  }, options);

export const useGatherCommentEditMutation = (
  gatherId: number,
  options?: MutationOptions<[string, string]>
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
export const useGatherCommentDeleteMutation = (
  gatherId: number,
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(async (commentId) => {
    await axios.delete(`${SERVER_URI}/gather/comment`, {
      data: { gatherId, commentId },
    });
  }, options);

/** user action */

export const useGatherParticipateMutation = (
  gatherId: number,
  options?: MutationOptions<ParticipationPhase>
) =>
  useMutation<void, AxiosError, ParticipationPhase>(async (phase) => {
    await axios.post(`${SERVER_URI}/gather/participate`, {
      gatherId,
      phase,
    });
  }, options);

export const useGatherCancelMutation = (
  gatherId: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.delete(`${SERVER_URI}/gather/participate`, {
      data: { gatherId },
    });
  }, options);

/** organizer action */
export const useGatherDeleteMutation = (
  gatherId: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.delete(`${SERVER_URI}/gather`, { data: { gatherId } });
  }, options);

export const useGatherStatusOpen = (
  gatherId: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`${SERVER_URI}/gather/open`, { gatherId });
  }, options);

export const useGatherStatusClose = (
  gatherId: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`${SERVER_URI}/gather/close`, { gatherId });
  }, options);

export const useGatherStatusEnd = (
  gatherId: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.patch(`${SERVER_URI}/gather/end`, { gatherId });
  }, options);
