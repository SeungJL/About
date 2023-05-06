import mongoose, { Model, Schema, model } from "mongoose";
import { IStoreApplicant } from "../types/store";

const giftSchema: Schema = new Schema(
  {
    uid: { type: String, ref: "User" },
    name: { type: String, ref: "User" },
    cnt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GiftModel =
  (mongoose.models.GiftModel as Model<IStoreApplicant, {}, {}, {}>) ||
  mongoose.model<IStoreApplicant>("GiftModel", giftSchema);
