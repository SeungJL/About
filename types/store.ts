import { Dayjs } from "dayjs";

export interface IStoreGift {
  image: string;
  name: string;
  brand: string;
  point: number;
  winner: number;
  date: { startDay: Dayjs; endDay: Dayjs };
}
