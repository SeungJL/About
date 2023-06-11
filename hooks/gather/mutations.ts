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
