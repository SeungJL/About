import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { MutationOptions } from "../../types/reactTypes";

export const useCollectionAlphabetMutation = (
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(async (alphabet) => {
    const res = await axios.post(`${SERVER_URI}/collection/alphabet`, {
      alphabet,
    });
    return res.data;
  }, options);
