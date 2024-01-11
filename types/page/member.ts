import { IUser } from "../user/user";

export type MemberGroup =
  | "member"
  | "human"
  | "resting"
  | "birth"
  | "enthusiastic"
  | "groupA"
  | "groupB"
  | "groupC";

export interface IGroupedMembers extends Record<MemberGroup, IUser[]> {}
