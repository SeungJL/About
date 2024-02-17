import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { requestServer } from "../../helpers/methodHelpers";
import { IGroup, IGroupWriting } from "../../types/page/Group";

import { MutationOptions } from "../../types/reactTypes";

type GroupWritingParam<T> = T extends "post"
  ? { Group: IGroupWriting }
  : T extends "patch"
  ? { Group: IGroup }
  : { GroupId: number };

/** Group info */
export const useGroupWritingMutation = <T extends "post" | "patch" | "delete">(
  method: T,
  options?: MutationOptions<GroupWritingParam<T>>
) =>
  useMutation<void, AxiosError, GroupWritingParam<T>>(
    (param) =>
      requestServer<GroupWritingParam<T>>({
        method,
        url: "Group",
        body: param,
      }),
    options
  );

type GroupParticipationParam<T> = T extends "post" ? "first" | "second" : void;

interface IGroupParticipationRequest<T> {
  id: number;
}

export const useGroupParticipationMutation = <T extends "post" | "delete">(
  method: T,
  id: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(
    () =>
      requestServer<IGroupParticipationRequest<T>>({
        method,
        url: "Group/participate",
        body: { id },
      }),
    options
  );

interface IUserGroupAttendRequest extends IAttendMutationParam {
  id: number;
}

interface IAttendMutationParam {
  weekRecord: string[];
  weekRecordSub?: string[];
  type: "this" | "last";
}

export const useGroupAttendMutation = (
  id: number,
  options?: MutationOptions<IAttendMutationParam>
) =>
  useMutation<void, AxiosError, IAttendMutationParam>(
    ({ weekRecord, type, weekRecordSub }) =>
      requestServer<IUserGroupAttendRequest>({
        method: "patch",
        url: "Group/attendance",
        body: { id, weekRecord, type, weekRecordSub },
      }),
    options
  );

type GroupCommentParam<T> = T extends "post"
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

interface IGroupCommentRequest<T> {
  id: number;
  comment?: string;
  commentId?: string;
}
export const useGroupCommentMutation = <T extends "post" | "patch" | "delete">(
  method: T,
  GroupId: number,
  options?: MutationOptions<GroupCommentParam<T>>
) =>
  useMutation<void, AxiosError, GroupCommentParam<T>>(
    (param) =>
      requestServer<IGroupCommentRequest<T>>({
        method,
        url: "Group/comment",
        body: {
          id: GroupId,
          comment: param?.comment,
          commentId: param?.commentId,
        },
      }),
    options
  );

type Status = "pending" | "open" | "close" | "end";

interface IGroupStatusRequest {
  GroupId: number;
  status: Status;
}

export const useGroupStatusMutation = (
  GroupId: number,
  options?: MutationOptions<Status>
) =>
  useMutation<void, AxiosError, Status>(
    (status) =>
      requestServer<IGroupStatusRequest>({
        method: "patch",
        url: "Group/status",
        body: {
          GroupId,
          status,
        },
      }),
    options
  );

interface IGroupWaitingParam {
  answer: string;
  pointType: "point" | "deposit";
}

export const useGroupWaitingMutation = (
  id: number,
  options?: MutationOptions<IGroupWaitingParam>
) =>
  useMutation<void, AxiosError, IGroupWaitingParam>(
    ({ answer, pointType }) =>
      requestServer<{
        id: number;
        answer: string;
        pointType: "point" | "deposit";
      }>({
        method: "post",
        url: "Group/waiting",
        body: {
          id,
          answer,
          pointType,
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

export const useGroupWaitingStatusMutation = (
  id: number,
  options?: MutationOptions<IWaitingStatusParam>
) =>
  useMutation<void, AxiosError, IWaitingStatusParam>(
    ({ status, userId }) =>
      requestServer<IWaitingStatusRequest>({
        method: "post",
        url: "Group/waiting/status",
        body: {
          id,
          status,
          userId,
        },
      }),
    options
  );

export const useGroupAttendancePatchMutation = (
  id: number,
  options?: MutationOptions<void>
) =>
  useMutation<void, AxiosError, void>(
    () =>
      requestServer<{ id: number }>({
        method: "patch",
        url: "Group/attendance/confirm",
        body: {
          id,
        },
      }),
    options
  );
