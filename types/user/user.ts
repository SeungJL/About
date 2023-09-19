import { Document } from "mongoose";
import { BADGE_COLOR } from "../../constants/badge";
import { Location } from "../system";

/** user */
export interface IUser extends IUser2, Document {}

export interface IUser2 {
  uid: string;
  registerDate: string;
  isActive: boolean;
  birth: string;
  mbti: string;
  gender: Gender;
  name: string;
  point: number;
  role: Role;
  score: number;
  comment: string;
  rest: IRest;
  location: Location;
  avatar: IAvatar;
  interests?: IInterests;
  deposit: number;
  majors: IMajor[];
  telephone: string;
  profileImage: string;
  thumbnailImage: string;
}

export type Gender = "남성" | "여성" | "";

export type Role =
  | "noMember"
  | "waiting"
  | "human"
  | "member"
  | "manager"
  | "previliged"
  | "resting";

export interface IRest {
  type: string;
  startDate: Date;
  endDate: Date;
  content: string;
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

/** register */
export interface IUserRegister extends IRegisterForm {
  role?: Role;
  isActive?: boolean;
}

export interface IRegisterForm {
  registerDate?: string;
  location: Location;
  name: string;
  mbti?: string;
  birth: string;
  agree?: any;
  gender: Gender;
  interests?: IInterests;
  majors: IMajor[];
  comment: string;
  telephone?: string;
  profileImage?: string;
  uid?: string;
}

/** badge */
export interface IUserBadge {
  badge: UserBadge;
  color: UserBadgeColor;
}

export type UserBadge =
  | null
  | "아메리카노"
  | "라떼"
  | "마키아또"
  | "에스프레소"
  | "모카"
  | "콜드브루"
  | "아인슈페너"
  | "딸기스무디"
  | "라벤더";

export type EventBadge = "딸기스무디" | "라벤더";

export type UserBadgeColor = typeof BADGE_COLOR[UserBadge];

/** react-query */
export interface IUserComment {
  comment: string;
  _id?: string;
}

export interface IUsersAll {
  usersAll: IUser2[];
}
