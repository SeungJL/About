import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SERVER_URI } from "../../../../constants/system";
import { IInteractionSendLike } from "../../../../types/interaction";
import { MutationOptions } from "../../../../types/reactTypes";

export const useInteractionLikeMutation = (
  options?: MutationOptions<IInteractionSendLike>
) =>
  useMutation<void, AxiosError, IInteractionSendLike>(
    async (sendInfo: IInteractionSendLike) => {
      await axios.post(`${SERVER_URI}/notice/like`, sendInfo);
    },
    options
  );
