import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { COLLECTION_ALPHABET } from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { QueryOptions } from "../../types/reactTypes";
import { ICollectionAlphabet } from "../../types/user/collections";

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
