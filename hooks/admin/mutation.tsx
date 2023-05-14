import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

export const useUpdateProfileMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (profile) => {
    await axios.post(`${process.env.SERVER_URI}/admin/user`, { profile });
  }, options);
