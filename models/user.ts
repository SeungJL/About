import mongoose, { model, Schema, Document, Model } from "mongoose";
import { IAccount, IUser } from "../types/user";
import { UserStatisticShema } from "./statistics";

export const UserSchema: Schema<IUser> = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  registerDate: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  birth: {
    type: String,
    default: "",
  },
  mbti: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default:
      "https://user-images.githubusercontent.com/48513798/173180642-8fc5948e-a437-45f3-91d0-3f0098a38195.png",
  },
  role: String,
  statistic: UserStatisticShema,
  score: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: "안녕하세요! 잘 부탁드립니다~!",
  },
});
export const AccountSchema: Schema<IAccount> = new Schema({
  provider: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  token_type: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Number,
    required: true,
  },
  scope: String,
  refresh_token_expires_in: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Account =
  (mongoose.models.Account as Model<IAccount, {}, {}, {}>) ||
  model<IAccount>("Account", AccountSchema);

export const User =
  (mongoose.models.User as Model<IUser, {}, {}, {}>) ||
  model<IUser>("User", UserSchema);
