export type InteractionType = "like";

export interface IInteractionSendLike {
  to: string;
  message?: string;
}

export interface IInteractionGetLike extends IInteractionSendLike {
  from: string;
  type: InteractionType;
}
