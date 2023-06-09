export interface IScore {
  name?: string;
  score: number;
  uid?: string;
}

export interface IWarningScore {
  score: number;
  message?: string;
}

export interface IPoint {
  point: number;
  _id?: string;
}

export interface IPointAll extends IPoint {
  uid: string;
  name: string;
}

export interface IDeposit {
  deposit: number;
}

export interface IPointSystem {
  value: number;
  message?: string;
}

export interface IPointLog {
  message: string;
  meta: {
    type: "score" | "point" | "deposit";
    uid: number;
    value: number;
    _id?: string;
  };
  timestamp: string;
}
