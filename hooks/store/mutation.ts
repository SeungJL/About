import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { IStoreApplicant } from "../../types/page/store";

export const useStoreMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IStoreApplicant>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IStoreApplicant>(async (applyInfo) => {
    await axios.post("/api/store", applyInfo);
  }, options);
