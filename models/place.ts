import mongoose, { model, Schema, Document, Model } from "mongoose";

export interface IPlace {
  status: string;
  fullname: string;
  brand?: string;
  branch?: string;
  image?: string;
  color?: string;
  latitude: number;
  longitude: number;
  priority?: number;
}

export const PlaceSchema: Schema<IPlace> = new Schema({
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  fullname: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  branch: String,
  image: String,
  color: String,
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  priority: Number,
});

export const Place =
  (mongoose.models.Place as Model<IPlace, {}, {}, {}>) ||
  model<IPlace>("Place", PlaceSchema);
