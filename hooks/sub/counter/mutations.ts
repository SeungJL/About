import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../../libs/methodHelpers";
import { ICounter } from "../../../types2/page/admin";
import { MutationOptions } from "../../../types2/reactTypes";

export const useCounterMutation = (
  key: "enthusiasticMember",
  location: Location,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(
    () =>
      requestServer<ICounter>({
        method: "post",
        url: `admin/counter`,
        body: { key, location },
      }),
    options
  );
