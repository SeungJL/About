import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IUserRequest } from "../../types/user/userRequest";

export const useUserRequestMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IUserRequest>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IUserRequest>(async (plaza) => {
    const res = await axios.post(`${SERVER_URI}/plaza`, { plaza });
    return res.data;
  }, options);
