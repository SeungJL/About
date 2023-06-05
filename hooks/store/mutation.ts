// import axios, { AxiosError } from "axios";
// import { useMutation, UseMutationOptions } from "react-query";

// export const useStoreMutation = (
//   options?: Omit<
//     UseMutationOptions<void, AxiosError, any>,
//     "mutationKey" | "mutationFn"
//   >
// ) =>
//   useMutation<void, AxiosError, any>(async (info) => {
//     await axios.post(`${SERVER_URI}/store`, info);
//   }, options);
import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

export const useStoreMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, any>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, any>(async (info) => {
    await axios.post("/api/store", info);
  }, options);
