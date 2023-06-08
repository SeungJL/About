import axios, { AxiosError } from "axios";
import CryptoJS from "crypto-js";
import { useQuery, UseQueryOptions } from "react-query";

const NAVER_APP_ID = "yourAppId";
const NAVER_APP_SECRET = "yourAppSecret";

const timestamp = Date.now().toString();
const hmac = CryptoJS?.HmacSHA256(
  `POST\n/geolocation/v2/geoLocation\n${timestamp}\n`,
  NAVER_APP_SECRET
);
const signature = hmac.toString(CryptoJS.enc.Base64);

const headers = {
  "x-ncp-apigw-timestamp": timestamp,
  "x-ncp-iam-access-key": NAVER_APP_ID,
  "x-ncp-apigw-signature-v2": signature,
  "Content-Type": "application/json",
};

export const useUserLocationQuery = (
  options?: Omit<UseQueryOptions<any, AxiosError, any>, "queryKey" | "queryFn">
) =>
  useQuery<any, AxiosError, any>(
    "userLocation",
    async () => {
      const res = await axios.get<any>("/api/geolocation/v2/geoLocation", {
        headers: headers,
      });
      return res.data;
    },
    options
  );
