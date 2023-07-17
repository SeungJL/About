import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { GATHER_CONTENT } from "../../constants/queryKey";
import { SERVER_URI } from "../../constants/system";
import { IGatherSummary } from "../../pages/review";
import { IGatherContent } from "../../types/page/gather";

export const useGatherContentQuery = (
  options?: Omit<
    UseQueryOptions<IGatherContent[], AxiosError, IGatherContent[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IGatherContent[], AxiosError, IGatherContent[]>(
    [GATHER_CONTENT, "content"],
    async () => {
      const res = await axios.get<IGatherContent[]>(`${SERVER_URI}/gather`);
      return res.data;
    },
    options
  );
export const useGatherSummaryQuery = (
  options?: Omit<
    UseQueryOptions<IGatherSummary[], AxiosError, IGatherSummary[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IGatherSummary[], AxiosError, IGatherSummary[]>(
    [GATHER_CONTENT, "summary"],
    async () => {
      const res = await axios.get<IGatherContent[]>(`${SERVER_URI}/gather`);
      const data = res.data.map((item) => ({
        title: item.title,
        type: item.type,
        location: item.location,
        date: item.date,
        id: item.id,
      }));
      return data;
    },
    options
  );
