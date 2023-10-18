import { ITimeStamps } from "./timeAndDate";

export type InteractionType = "like";

export interface IInteractionSendLike {
  to: string;
  message?: string;
}

export interface IInteractionGetLike extends IInteractionSendLike, ITimeStamps {
  from: string;
  type: InteractionType;
}

export interface IInteractionLikeStorage {
  uid: string;
  date: string;
}
