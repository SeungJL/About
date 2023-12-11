import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import {
  GATHER_CONTENT,
  GROUP_STUDY_ALL,
} from "../../constants/keys/queryKeys";
import { SERVER_URI } from "../../constants/system";
import { IGatherSummary } from "../../pages/review";
import { IGather } from "../../types/page/gather";
import { IGroupStudy } from "../../types/page/groupStudy";
import { QueryOptions } from "../../types/reactTypes";

export const useGroupStudyAllQuery = (options?: QueryOptions<IGroupStudy[]>) =>
  useQuery<IGroupStudy[], AxiosError, IGroupStudy[]>(
    [GROUP_STUDY_ALL],
    async () => {
      const res = await axios.get<IGroupStudy[]>(`${SERVER_URI}/groupStudy`);
      return res.data;
    },
    options
  );
export const useGatherAllSummaryQuery = (
  options?: QueryOptions<IGatherSummary[]>
) =>
  useQuery<IGatherSummary[], AxiosError, IGatherSummary[]>(
    [GATHER_CONTENT, "summary"],
    async () => {
      const res = await axios.get<IGather[]>(`${SERVER_URI}/gather`);
      const data = res.data.map((item) => ({
        title: item.title,
        type: item.type,
        location: item.location,
        date: item.date,
        id: item.id,
        place: item.place,
      }));
      return data;
    },
    options
  );
