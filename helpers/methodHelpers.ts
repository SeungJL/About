import axios from "axios";
import { SERVER_URI } from "../constants/system";

interface IRequestParams<T, M> {
  method: "get" | "post" | "patch" | "delete";
  url: string;
  body?: T;
  return?: M;
}

export const requestServer = async <T, M = void>({
  method,
  url,
  body,
}: IRequestParams<T, M>): Promise<M> => {
  switch (method) {
    case "get":
      const res2 = await axios.get<M>(`${SERVER_URI}/${url}`);
      return res2.data;
    case "post":
      const res = await axios.post<M>(`${SERVER_URI}/${url}`, body);
      return res.data;
    case "patch":
      return axios.patch(`${SERVER_URI}/${url}`, body);
    case "delete":
      return axios.delete(`${SERVER_URI}/${url}`);

    default:
      throw new Error("Invalid HTTP method");
  }
};
