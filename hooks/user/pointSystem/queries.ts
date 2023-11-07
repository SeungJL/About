import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { SERVER_URI } from "../../../constants/system";
import { QueryOptions } from "../../../types/reactTypes";
import { IPointAll, IPointLog, IScore } from "../../../types/user/pointSystem";

//score

export const useScoreLogQuery = (options?: QueryOptions<IPointLog[]>) =>
  useQuery<IPointLog[], AxiosError, IPointLog[]>(
    "scoreLog",
    async () => {
      const res = await axios.get(`${SERVER_URI}/log/score`);
      return res.data;
    },
    options
  );

export const useScoreAllQuery = (options?: QueryOptions<IScore[]>) =>
  useQuery<IScore[], AxiosError, IScore[]>(
    "scoreAll",
    async () => {
      const res = await axios.get<IScore[]>(`${SERVER_URI}/user/score/all`);
      return res.data;
    },
    options
  );

export const useScoreLogAllQuery = (options?: QueryOptions<IPointLog[]>) =>
  useQuery<IPointLog[], AxiosError, IPointLog[]>(
    "scoreLogAll",
    async () => {
      const res = await axios.get(`${SERVER_URI}/log/score/all`);
      return res.data;
    },
    options
  );

export const usePointLogQuery = (options?: QueryOptions<IPointLog[]>) =>
  useQuery<IPointLog[], AxiosError, IPointLog[]>(
    "pointLog",
    async () => {
      const res = await axios.get<IPointLog[]>(`${SERVER_URI}/log/point`);
      return res.data;
    },
    options
  );

export const usePointAllQuery = (options?: QueryOptions<IPointAll[]>) =>
  useQuery<IPointAll[], AxiosError, IPointAll[]>(
    "pointAll",
    async () => {
      const res = await axios.get<IPointAll[]>(`${SERVER_URI}/user/point/all`);

      return res.data;
    },
    options
  );

export const usePointLogAllQuery = (options?: QueryOptions<IPointLog>) =>
  useQuery<IPointLog, AxiosError, IPointLog>(
    "pointLogAll",
    async () => {
      const res = await axios.get(`${SERVER_URI}/log/point/all`);
      return res.data;
    },
    options
  );

export const useDepositLogQuery = (options?: QueryOptions<IPointLog[]>) =>
  useQuery<IPointLog[], AxiosError, IPointLog[]>(
    "depositLog",
    async () => {
      const res = await axios.get<IPointLog[]>(`${SERVER_URI}/log/deposit`);
      return res.data;
    },
    options
  );

export const useDepositAllQuery = (options?: QueryOptions<IPointAll[]>) =>
  useQuery<IPointAll[], AxiosError, IPointAll[]>(
    "depositAll",
    async () => {
      const res = await axios.get<IPointAll[]>(
        `${SERVER_URI}/user/deposit/all`
      );
      return res.data;
    },
    options
  );
