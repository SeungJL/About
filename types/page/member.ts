import { IUser } from "../user/user";

export type MemberGroup = "member" | "human" | "resting" | "birth";

export interface IGroupedMembers extends Record<MemberGroup, IUser[]> {}
