import { Dayjs } from "dayjs";

export interface IStoreGift {
  image: string;
  name: string;
  brand: string;
  point: number;
  winner: number;
  date: { startDay: Dayjs; endDay: Dayjs };
  giftId?: number;
}

export interface IStoreApplicant {
  uid: string;
  name: string;
  cnt: number;
  giftId?: number;
}
