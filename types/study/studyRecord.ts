/** arrived */
export interface IArrivedInfo {
  uid: string;
  name: string;
}

export interface IArrivedInfoList {
  placeId: string;
  arrivedInfo: IArrivedInfo[];
}

export interface IArrivedData {
  date: string | number;
  arrivedInfoList: IArrivedInfoList[];
}

export interface IVoteRate {
  uid: string;
  cnt: number;
}
