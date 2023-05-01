import { Dayjs } from "dayjs";

export interface IStoreGift {
  image: string;
  name: string;
  brand: string;
  point: number;
  win: number;
  date: { startDay: Dayjs; endDay: Dayjs };
}
