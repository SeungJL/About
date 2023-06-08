import mongoose, { model, Model, Schema } from "mongoose";
import { IAccount } from "../types/user";

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
