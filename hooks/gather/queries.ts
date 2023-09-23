import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { GATHER_CONTENT } from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { IGatherSummary } from "../../pages/review";
import { IGatherContent } from "../../types/page/gather";
import { QueryOptions } from "../../types/reactTypes";

export const useGatherContentQuery = (
  options?: QueryOptions<IGatherContent[]>
) =>
  useQuery<IGatherContent[], AxiosError, IGatherContent[]>(
    [GATHER_CONTENT, "content"],
    async () => {
      const res = await axios.get<IGatherContent[]>(`${SERVER_URI}/gather`);
      // const data = res.data.map((content) => ({
      //   ...content,
      //   participants: content.participants.filter((who) => who.user),
      // }));
      return res.data;
    },
    options
  );
export const useGatherSummaryQuery = (
  options?: QueryOptions<IGatherSummary[]>
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
