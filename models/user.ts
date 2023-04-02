import mongoose, { model, Schema, Model } from "mongoose";
import { IUser } from "../types/user";

export const UserSchema: Schema<IUser> = new Schema({
  uid: {
    type: String,
    required: true,
    unique: false,
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
  score: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: "안녕하세요! 잘 부탁드립니다~!",
  },
});

export const User =
  (mongoose.models.User as Model<IUser, {}, {}, {}>) ||
  model<IUser>("User", UserSchema);
