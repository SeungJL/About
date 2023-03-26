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
