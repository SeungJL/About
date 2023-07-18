import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { IStoreApplicant } from "../../types/page/store";
import { MutationOptions } from "../../types/reactTypes";

export const useStoreMutation = (options?: MutationOptions<IStoreApplicant>) =>
  useMutation<void, AxiosError, IStoreApplicant>(async (applyInfo) => {
    await axios.post("/api/store", applyInfo);
  }, options);
