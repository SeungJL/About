import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { PLAZA_FINDALL } from "../../libs/queryKeys";
import { IPlazaData } from "../../types/plaza";

export const usePlazaQuery = (
  options?: Omit<
    UseQueryOptions<IPlazaData[], AxiosError, IPlazaData[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IPlazaData[], AxiosError, IPlazaData[]>(
    PLAZA_FINDALL,
    async () => {
      const res = await axios.get<IPlazaData[]>(`/api/plaza`);
      return res.data;
    },
    options
  );
