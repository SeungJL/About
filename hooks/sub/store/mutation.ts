import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { IStoreApplicant } from "../../../types2/page/store";
import { MutationOptions } from "../../../types2/reactTypes";

export const useStoreMutation = (options?: MutationOptions<IStoreApplicant>) =>
  useMutation<void, AxiosError, IStoreApplicant>(async (applyInfo) => {
    await axios.post("/api/store", applyInfo);
  }, options);
