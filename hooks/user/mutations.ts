import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

export const useActiveMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, boolean>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, boolean>(async (isActive) => {
    await axios.post(`/api/user/profile`, { isActive });
  }, options);
