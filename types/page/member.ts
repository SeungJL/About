import { IUser } from "../user/user";

export type MemberGroup =
  | "member"
  | "human"
  | "resting"
  | "birth"
  | "enthusiastic"
  | "groupA"
  | "groupB"
  | "groupC"
  | "groupD"
  | "groupE"
  | "groupF";

export interface IGroupedMembers extends Record<MemberGroup, IUser[]> {}
