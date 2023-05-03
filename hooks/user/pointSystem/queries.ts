import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import {
  IDeposit,
  IPoint,
  IPointAll,
  IScore,
} from "../../../types/user/scoreSystem";

export const useScoreQuery = (
  options?: Omit<
    UseQueryOptions<IScore, AxiosError, IScore>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IScore, AxiosError, IScore>(
    "score",
    async () => {
      const res = await axios.get<IScore>("/api/user/score");
      return res.data;
    },
    options
  );

export const useScoreAllQuery = (
  options?: Omit<
    UseQueryOptions<IScore[], AxiosError, IScore[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IScore[], AxiosError, IScore[]>(
    "scoreAll",
    async () => {
      const res = await axios.get<IScore[]>("/api/user/score/all");
      return res.data;
    },
    options
  );

export const usePointQuery = (
  options?: Omit<
    UseQueryOptions<IPoint, AxiosError, IPoint>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IPoint, AxiosError, IPoint>(
    "point",
    async () => {
      const res = await axios.get<IPoint>("/api/user/point");
      return res.data;
    },
    options
  );

export const usePointAllQuery = (
  options?: Omit<
    UseQueryOptions<IPointAll[], AxiosError, IPointAll[]>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IPointAll[], AxiosError, IPointAll[]>(
    "pointAll",
    async () => {
      const res = await axios.get<IPointAll[]>("/api/user/point/all");

      return res.data;
    },
    options
  );

export const useDepositQuery = (
  options?: Omit<
    UseQueryOptions<IDeposit, AxiosError, IDeposit>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery<IDeposit, AxiosError, IDeposit>(
    "deposit",
    async () => {
      const res = await axios.get<IDeposit>("/api/user/deposit");
      return res.data;
    },
    options
  );
