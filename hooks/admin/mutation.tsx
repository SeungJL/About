import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";

export const useUpdateProfileMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (profile) => {
    await axios.post(`${SERVER_URI}/admin/user`, {
      profile,
    });
  }, options);
