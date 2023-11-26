import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../../../helpers/methodHelpers";
import { IInteractionSendLike } from "../../../../types/interaction";
import { MutationOptions } from "../../../../types/reactTypes";
import { useErrorToast } from "../../../custom/CustomToast";

interface IPostUserFriendRequest {
  toUid: string;
  message: string;
  sub?: string;
}
interface IPatchUserFriendRequest {
  from: string;
  status: "refusal" | "approval";
}

type Interaction<T, M> = T extends "like"
  ? IInteractionSendLike
  : M extends "post"
  ? IPostUserFriendRequest
  : IPatchUserFriendRequest;

export const useInteractionMutation = <
  T extends "like" | "friend" | "alphabet",
  M extends "post" | "patch"
>(
  type: T,
  method: M,
  options?: MutationOptions<Interaction<T, M>>
) => {
  const errorToast = useErrorToast();
  return useMutation<void, AxiosError, Interaction<T, M>>(
    (param) =>
      requestServer<Interaction<T, M>>({
        method,
        url: `notice/${type}`,
        body: param,
      }),
    { ...options, onError: errorToast }
  );
};
