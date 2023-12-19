import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../helpers/methodHelpers";
import { IGroupStudy, IGroupStudyWriting } from "../../types/page/groupStudy";

import { MutationOptions } from "../../types/reactTypes";

type GroupStudyWritingParam<T> = T extends "post"
  ? { groupStudy: IGroupStudyWriting }
  : T extends "patch"
  ? { groupStudy: IGroupStudy }
  : { groupStudyId: number };

/** groupstudy info */
export const useGroupStudyWritingMutation = <
  T extends "post" | "patch" | "delete"
>(
  method: T,
  options?: MutationOptions<GroupStudyWritingParam<T>>
) =>
  useMutation<void, AxiosError, GroupStudyWritingParam<T>>(
    (param) =>
      requestServer<GroupStudyWritingParam<T>>({
        method,
        url: "groupStudy",
        body: param,
      }),
    options
  );

type GroupStudyParticipationParam<T> = T extends "post"
  ? "first" | "second"
  : void;

interface IGroupStudyParticipationRequest<T> {
  id: number;
}

export const useGroupStudyParticipationMutation = <T extends "post" | "delete">(
  method: T,
  id: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(
    () =>
      requestServer<IGroupStudyParticipationRequest<T>>({
        method,
        url: "groupStudy/participate",
        body: { id },
      }),
    options
  );

interface IUserGroupStudyAttendRequest extends IAttendMutationParam {
  id: number;
}

interface IAttendMutationParam {
  weekRecord: string[];
  type: "this" | "last";
}

export const useGroupStudyAttendMutation = (
  id: number,
  options?: MutationOptions<IAttendMutationParam>
) =>
  useMutation<void, AxiosError, IAttendMutationParam>(
    ({ weekRecord, type }) =>
      requestServer<IUserGroupStudyAttendRequest>({
        method: "patch",
        url: "groupStudy/attendance",
        body: { id, weekRecord, type },
      }),
    options
  );

type GroupStudyCommentParam<T> = T extends "post"
  ? {
      comment: string;
      commentId?: string;
    }
  : T extends "patch"
  ? {
      comment: string;
      commentId: string;
    }
  : {
      comment?: never;
      commentId: string;
    };

interface IGroupStudyCommentRequest<T> {
  id: number;
  comment?: string;
  commentId?: string;
}
export const useGroupStudyCommentMutation = <
  T extends "post" | "patch" | "delete"
>(
  method: T,
  groupstudyId: number,
  options?: MutationOptions<GroupStudyCommentParam<T>>
) =>
  useMutation<void, AxiosError, GroupStudyCommentParam<T>>(
    (param) =>
      requestServer<IGroupStudyCommentRequest<T>>({
        method,
        url: "groupstudy/comment",
        body: {
          id: groupstudyId,
          comment: param?.comment,
          commentId: param?.commentId,
        },
      }),
    options
  );

type Status = "pending" | "open" | "close" | "end";

interface IGroupStudyStatusRequest {
  groupstudyId: number;
  status: Status;
}

export const useGroupStudyStatusMutation = (
  groupstudyId: number,
  options?: MutationOptions<Status>
) =>
  useMutation<void, AxiosError, Status>(
    (status) =>
      requestServer<IGroupStudyStatusRequest>({
        method: "patch",
        url: "groupstudy/status",
        body: {
          groupstudyId,
          status,
        },
      }),
    options
  );
export const useGroupStudyWaitingMutation = (
  id: number,
  options?: MutationOptions<string>
) =>
  useMutation<void, AxiosError, string>(
    (answer: string) =>
      requestServer<{ id: number; answer: string }>({
        method: "post",
        url: "groupstudy/waiting",
        body: {
          id,
          answer,
        },
      }),
    options
  );

interface IWaitingStatusParam {
  status: "agree" | "refuse";
  userId: string;
}

interface IWaitingStatusRequest extends IWaitingStatusParam {
  id: number;
}

export const useGroupStudyWaitingStatusMutation = (
  id: number,
  options?: MutationOptions<IWaitingStatusParam>
) =>
  useMutation<void, AxiosError, IWaitingStatusParam>(
    ({ status, userId }) =>
      requestServer<IWaitingStatusRequest>({
        method: "post",
        url: "groupstudy/waiting/status",
        body: {
          id,
          status,
          userId,
        },
      }),
    options
  );

export const useGroupStudyAttendancePatchMutation = (
  id: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(
    () =>
      requestServer<{ id: number }>({
        method: "patch",
        url: "groupstudy/attendance/confirm",
        body: {
          id,
        },
      }),
    options
  );
