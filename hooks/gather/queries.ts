import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { IGatherContent } from "../../types/gather";

export const useGatherContentQuery = (
  options?: Omit<
    UseQueryOptions<IGatherContent[], AxiosError, IGatherContent[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IGatherContent[], AxiosError, IGatherContent[]>(
    "gatherContent",
    async () => {
      const res = await axios.get<IGatherContent[]>(`${SERVER_URI}/gather`);
      return res.data;
    },
    options
  );
