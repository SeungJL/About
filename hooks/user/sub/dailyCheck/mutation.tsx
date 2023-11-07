import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../../../constants/system";
import { MutationOptions } from "../../../../types/reactTypes";

export const useDailyCheckMutation = (options?: MutationOptions) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.post(`${SERVER_URI}/dailyCheck`);
  }, options);
