import { ITimeStamps } from "./timeAndDate";

export type InteractionType = "like" | "friend";

export interface IInteractionSendLike {
  to: string;
  message?: string;
}

export interface INoticeActiveLog extends IInteractionSendLike, ITimeStamps {
  from: string;
  type: InteractionType;
  status?: "pending" | "refusal" | "approval" | "response";
}

export interface IInteractionLikeStorage {
  uid: string;
  date: string;
}
