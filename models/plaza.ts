import mongoose, { model, Model, Schema } from "mongoose";

export interface IPlazaData {
  category: string;
  writer: string;
  deadline?: string;
  title: string;
  content?: string;
  suggestContent?: string;
  voteList?: IVoteList[];
  id?: string;
}
interface IVoteList {
  voteListIdx: number;
  value: string;
}

export interface IPlazaBlock {
  data: IPlazaData;
}

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
