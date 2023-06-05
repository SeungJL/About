import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IPlazaData } from "../../types/plaza";

export const usePlazaMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IPlazaData>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IPlazaData>(async (plaza) => {
    const res = await axios.post(`${SERVER_URI}/plaza`, { plaza });
    return res.data;
  }, options);
