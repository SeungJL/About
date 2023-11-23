import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../../helpers/methodHelpers";
import { ICounter } from "../../../types/page/admin";
import { MutationOptions } from "../../../types/reactTypes";
import { Location } from "../../../types/system";

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
