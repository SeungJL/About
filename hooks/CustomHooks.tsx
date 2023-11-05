import { useCallback } from "react";
import { useQueryClient } from "react-query";

export const useResetQueryData = () => {
  const queryClient = useQueryClient();

  const refetchWithDelay = useCallback(
    (key: string | string[]) => {
      const timeoutId = setTimeout(() => {
        queryClient.refetchQueries(key);
      }, 200);
      return () => clearTimeout(timeoutId);
    },
    [queryClient]
  );

  return refetchWithDelay;
};
