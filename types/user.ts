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
