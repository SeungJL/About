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

export type IUserBadge =
  | ""
  | "아메리카노"
  | "라떼"
  | "마키아토"
  | "에스프레소"
  | "모카"
  | "콜드브루"
  | "아인슈페너";
