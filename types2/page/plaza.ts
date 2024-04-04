export interface IPlazaData {
  category: string;
  title: string;
  content: string;
  voteList?: IVoteList[];
  id?: string;
  writer: string;
  date?: string;
  deadline?: any;
  suggestContent?: any;
}
interface IVoteList {
  voteListIdx: number;
  value: string;
}

export interface IPlazaBlock {
  data: IPlazaData;
}

export type category = "전체" | "일상" | "고민" | "정보" | "같이해요";
