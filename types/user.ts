import { Document } from "mongoose";
import { Location } from "./system";
import { IPointAll, IScore } from "./user/scoreSystem";

export interface kakaoProfileInfo {
  name: string;

  profileImage: string;
}

export interface IUserComment {
  comment: string;
  _id: string;
}

export interface restType {
  type: string;
  startDate: Date;
  endDate: Date;
  content: string;
}

export interface avatarType {
  type: number;
  bg: number;
}

export interface IUser extends Document {
  uid: string;
  registerDate: string;
  isActive: boolean;
  birth: string;
  mbti: string;
  gender: Gender;
  name: string;
  point: number;
  profileImage: string;
  role: IRole;
  score: number;
  message: string;
  rest: restType;
  location: Location;
  avatar: avatarType;
  interest?: string[];
  deposit: number;
  majors: IMajor[];
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

export interface IMajor {
  department: string;
  detail: string;
}
export type Gender = "남성" | "여성" | "";
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
  message: string;
  telephone?: string;
  profileImage?: string;
  uid?: string;
}
// export interface IRegisterForm {
//   registerDate?: string;
//   location: Location;
//   name: string;
//   mbti?: string;
//   birth: string;
//   agree?: any;
//   gender: Gender;
//   interests: IInterests;
//   majors: Imajors[];
//   message: string;
//   telephone: string;
//   profileImg: string;
// }
export interface IInterests {
  first: string;
  second?: string;
}

export type IRole = "previliged" | "member";
export interface IUserRegister extends IRegisterForm {
  role?: IRole;
  isActive?: boolean;
}
export const USER_BADGES = {
  아메리카노: "gray",
  라떼: "orange",
  마키아또: "green",
  에스프레소: "purple",
  모카: "yellow",
  콜드브루: "twitter",
  아인슈페너: "teal",
};

export type UserBadge =
  | null
  | "아메리카노"
  | "라떼"
  | "마키아또"
  | "에스프레소"
  | "모카"
  | "콜드브루"
  | "아인슈페너";

export type UserBadgeColor = typeof USER_BADGES[UserBadge];
export interface IUserBadge {
  badge: UserBadge;
  color: UserBadgeColor;
}

export interface IRankScore {
  isRank: boolean;
  myRank?: number;
  percent?: boolean;
  scoreArr?: IScore[];
}

export interface IAvatar {
  type: number;
  bg: number;
}
