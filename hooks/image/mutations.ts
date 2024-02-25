import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../helpers/methodHelpers";
import { MutationOptions } from "../../types/reactTypes";

export const useImageUploadMutation = (options?: MutationOptions<any>) =>
  useMutation<void, AxiosError, any>(
    ({ start, end }) =>
      requestServer<any>({
        method: "post",
        url: `image/upload`,
        body: { start, end },
      }),
    options
  );
