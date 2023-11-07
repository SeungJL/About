import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../../../helpers/methodHelpers";
import { MutationOptions } from "../../../../types/reactTypes";
import { IUserRequest } from "../../../../types/user/userRequest";

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
