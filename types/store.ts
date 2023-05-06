import { Dayjs } from "dayjs";

export interface IStoreGift {
  image: string;
  name: string;
  brand: string;
  point: number;
  winner: number;
  date: { startDay: Dayjs; endDay: Dayjs };
  giftid?: string;
}

export interface IStoreApplicant {
  uid: string;
  name: string;
  cnt: number;
  giftid?: string;
}
