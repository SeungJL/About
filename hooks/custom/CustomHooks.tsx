import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

export const useToken = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/token");
      setToken(response.data);
    };

    fetchData();
  }, []);

  return token;
};

export const useResetQueryData = () => {
  const queryClient = useQueryClient();

  const refetchWithDelay = useCallback(
    (key: any | any[]) => {
      const timeoutId = setTimeout(() => {
        queryClient.refetchQueries(key);
      }, 800);
      return () => clearTimeout(timeoutId);
    },
    [queryClient]
  );

  return refetchWithDelay;
};
