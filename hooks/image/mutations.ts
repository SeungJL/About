import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../libs/methodHelpers";
import { MutationOptions } from "../../types2/reactTypes";

export const useImageUploadMutation = (options?: MutationOptions<FormData>) =>
  useMutation<void, AxiosError, FormData>(
    (param) =>
      requestServer<FormData>({
        method: "post",
        url: `image/upload/vote`,
        body: param,
      }),
    options
  );
