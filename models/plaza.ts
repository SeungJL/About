import mongoose, { model, Model, Schema } from "mongoose";
import { IPlazaData } from "../types2/page/plaza";

export const PlazaSchema: Schema<IPlazaData> = new Schema({
  category: {
    type: String,
  },
  writer: {
    type: String,
  },
  deadline: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  suggestContent: {
    type: String,
  },
  voteList: {
    // type: [{}],
  },
});
export const Plaza =
  (mongoose.models.Plaza as Model<IPlazaData, {}, {}, {}>) ||
  model<IPlazaData>("Plaza", PlazaSchema);
