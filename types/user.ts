import { Document } from "mongoose";

export interface kakaoProfileInfo {
  name: string;

  profileImage: string;
}

export interface IUserComment {
  comment: string;
  _id: string;
}

export interface IUser extends Document {
  uid: string;
  registerDate: string;
  isActive?: boolean;
  birth: string;
  mbti: string;
  gender: string;
  name: string;
  point: number;
  profileImage: string;
  role?: string;
  score: number;
  comment: string;
}

export interface IAccount extends Document {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_at: number;
  scope: string;
  refresh_token_expires_in: number;
  userId: IUser | string;
}

export interface IScore {
  _id: string;
  point: number;
}

export interface IRegisterForm {
  registerDate: string;
  name: string;
  mbti?: string;
  birth: string;
  agree?: any;
  gender?: string;
}
export interface IUserRegister extends IRegisterForm {
  role?: string;
  isActive?: boolean;
  gender: string;
}
export const USER_BADGES = {
  아메리카노: "",
  라떼: "orange",
  마키아토: "green",
  에스프레소: "purple",
  모카: "yellow",
  콜드브루: "twitter",
  아인슈페너: "teal",
};

export type UserBadge =
  | null
  | "아메리카노"
  | "라떼"
  | "마키아토"
  | "에스프레소"
  | "모카"
  | "콜드브루"
  | "아인슈페너";

export type UserBadgeColor = typeof USER_BADGES[UserBadge];
export interface IUserBadge {
  badge: UserBadge;
  color: UserBadgeColor;
}
