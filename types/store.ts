export interface IStoreGift {
  image: string;
  name: string;
  brand: string;
  point: number;
  winner: number;

  giftId?: number;
  max?: number;
}

export interface IStoreApplicant {
  uid: string;
  name: string;
  cnt: number;
  giftId?: number;
}
