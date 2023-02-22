export interface IPlazaData {
  category: string;
  writer: string;
  deadline?: string;
  title: string;
  content: string;
  voteList?: string[];
  id: string;
}

export interface IPlazaBlock {
  data: IPlazaData;
}
