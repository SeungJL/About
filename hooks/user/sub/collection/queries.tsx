import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { COLLECTION_ALPHABET } from "../../../../constants/keys/queryKeys";
import { SERVER_URI } from "../../../../constants/system";
import { ICollectionAlphabet } from "../../../../types2/collections";
import { QueryOptions } from "../../../../types2/reactTypes";

export const useCollectionAlphabetQuery = (
  options?: QueryOptions<ICollectionAlphabet>
) =>
  useQuery<ICollectionAlphabet, AxiosError, ICollectionAlphabet>(
    [COLLECTION_ALPHABET],
    async () => {
      const res = await axios.get<ICollectionAlphabet>(
        `${SERVER_URI}/collection/alphabet`
      );
      return res.data;
    },
    options
  );
export const useCollectionAlphabetAllQuery = (
  options?: QueryOptions<ICollectionAlphabet[]>
) =>
  useQuery<ICollectionAlphabet[], AxiosError, ICollectionAlphabet[]>(
    "alphabetAll",
    async () => {
      const res = await axios.get<ICollectionAlphabet[]>(
        `${SERVER_URI}/collection/alphabet/all`
      );
      return res.data;
    },
    options
  );
