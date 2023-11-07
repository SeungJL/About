import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { COLLECTION_ALPHABET } from "../../../../constants/keys/queryKeys";
import { SERVER_URI } from "../../../../constants/system";
import { MutationOptions } from "../../../../types/reactTypes";

export const useCollectionAlphabetMutation = (
  options?: MutationOptions<string>
) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>(async (alphabet) => {
    const res = await axios.post(`${SERVER_URI}/collection/alphabet`, {
      alphabet,
    });
    const data = res.data;
    if (data) {
      queryClient.invalidateQueries(COLLECTION_ALPHABET);
    }
    return data;
  }, options);
};

export const useAlphabetCompletedMutation = (
  options?: MutationOptions<void>
) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, void>(async () => {
    const res = await axios.post(`${SERVER_URI}/collection/alphabet/completed`);
    const data = res.data;
    if (data) {
      queryClient.invalidateQueries(COLLECTION_ALPHABET);
    }
    return data;
  }, options);
};
