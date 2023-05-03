export interface IScore {
  name?: string;
  score: number;
  _id?: string;
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
