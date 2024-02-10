import { BADGE_COLOR } from "../../constants/settingValue/badge";
import { Location } from "../system";

export interface IUser extends IUserRegisterForm {
  isActive: boolean;
  point: number;
  role: Role;
  score: number;
  rest: IRest;
  avatar: IAvatar;
  deposit: number;
  profileImage: string;
  thumbnailImage: string;
  friend: string[];
  like: number;
  belong?: string;
  _id: string;
}
export interface IUserRegisterForm extends IUserRegisterFormWriting {
  registerDate?: string;
  profileImage?: string;
  uid?: string;
}
export interface IUserRegisterFormWriting {
  location: Location;
  name: string;
  mbti?: string;
  birth: string;
  gender: Gender;
  interests?: IInterests;
  majors: IMajor[];
  comment: string;
  telephone?: string;
}
export interface IUserIdentity {
  name: string;
  uid: string;
}

export type Gender = "남성" | "여성" | "";

export type Role =
  | "noMember"
  | "waiting"
  | "human"
  | "member"
  | "manager"
  | "previliged"
  | "resting"
  | "enthusiastic"
  | "newUser";

export interface IRest {
  type: string;
  startDate: Date;
  endDate: Date;
  content: string;
  cumulativeSum: number;
  restCnt: number;
}
export interface IAvatar {
  type: number;
  bg: number;
}

export interface IInterests {
  first: string;
  second?: string;
}
export interface IMajor {
  department: string;
  detail: string;
}

export interface IIsActive {
  isActive: {
    isActive: boolean;
    _id: string;
  };
}

/** badge */
export interface IUserBadge {
  badge: UserBadge;
  color: UserBadgeColor;
}

export type UserBadge =
  | "아메리카노"
  | "라떼"
  | "마키아또"
  | "에스프레소"
  | "모카"
  | "콜드브루"
  | "아인슈페너"
  | "유스베리"
  | EventBadge;

export type EventBadge = "딸기스무디" | "라벤더" | "민트초코";

export type UserBadgeColor = typeof BADGE_COLOR[UserBadge];

/** react-query */
export interface IUserComment {
  comment: string;
  _id?: string;
}

export interface IUsersAll {
  usersAll: IUser[];
}
