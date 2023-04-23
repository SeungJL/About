export interface IVoteRate {
  uid: string;
  cnt: number;
}

export interface IArrivedInfo {
  uid: string;
}
export interface IArrivedInfoList {
  placeId: string;
  arrivedInfo: IArrivedInfo[];
}
export interface IArrivedData {
  date: string | number;
  arrivedInfoList: IArrivedInfoList[];
}
