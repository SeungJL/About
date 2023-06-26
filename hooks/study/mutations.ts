import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IStudyParticipate } from "../../types/study";

import { IAbsentInfo } from "../../types/userRequest";
import { ITimeStartToEnd } from "../../types/utils";

export const useStudyParticipateMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IStudyParticipate>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IStudyParticipate>(async (studyParticipate) => {
    await axios.post(
      `${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}`,
      studyParticipate
    );
  }, options);

export const useStudyCancelMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.delete(`${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}`);
  }, options);

export const useStudyTimeChangeMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, ITimeStartToEnd>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, ITimeStartToEnd>(async (time) => {
    await axios.patch(`${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}`, time);
  }, options);

export const useStudyArrivedMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (memo) => {
    await axios.patch(
      `${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}/arrived`,
      {
        memo,
      }
    );
  }, options);

export const useStudyResultDecideMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation(async () => {
    await axios.patch<void>(
      `${SERVER_URI}/admin/vote/${date.format("YYYY-MM-DD")}/status/confirm`
    );
  }, options);

export const useStudyAbsentMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation(async (message) => {
    await axios.post(
      `${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}/absence`,
      { message }
    );
  }, options);

export const useStudyQuickVoteMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IAbsentInfo>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation(async (data) => {
    await axios.post(
      `${SERVER_URI}/vote/${date.format("YYYY-MM-DD")}/quick`,
      data
    );
  }, options);
