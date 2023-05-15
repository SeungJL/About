import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { PLAZA_FINDALL } from "../../libs/queryKeys";
import { IPlazaData } from "../../types/plaza";

export const usePlazaDataQuery = (
  options?: Omit<
    UseQueryOptions<IPlazaData[], AxiosError, IPlazaData[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IPlazaData[], AxiosError, IPlazaData[]>(
    PLAZA_FINDALL,
    async () => {
      const res = await axios.get<IPlazaData[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/plaza`
      );
      return res.data;
    },
    options
  );
