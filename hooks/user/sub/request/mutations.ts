import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../../../libs/methodHelpers";
import { MutationOptions } from "../../../../types2/reactTypes";
import { IUserRequest } from "../../../../types2/userTypes/userRequestTypes";

export const useUserRequestMutation = (
  options?: MutationOptions<IUserRequest>
) =>
  useMutation<void, AxiosError, IUserRequest>(
    (param) =>
      requestServer<{ request: IUserRequest }>({
        method: "post",
        url: `request`,
        body: { request: param },
      }),
    options
  );
