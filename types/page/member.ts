import { IUser } from "../user/user";

export type MemberClassification = "member" | "human" | "resting" | "birth";

export interface IClassifiedMember
  extends Record<MemberClassification, IUser[]> {}
