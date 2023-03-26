import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { IPlazaData } from "../../types/plaza";

export const usePlazaMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPlazaData>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPlazaData>(async (suggestionForm) => {
    await axios.post(`/api/plaza`, { suggestionForm });
  }, options);
