import { Dayjs } from "dayjs";

export interface ITimeStartToEndHM {
  start?: {
    hour?: number;
    minutes?: number;
  };
  end?: {
    hour?: number;
    minutes?: number;
  };
}
export interface IDateStartToEnd {
  start: Dayjs;
  end: Dayjs;
}

export interface ITimeStartToEnd {
  start?: Dayjs;
  end?: Dayjs;
}

export interface ITimeSelector {
  times: ITimeStartToEndHM;
  setTimes: ({ start, end }: ITimeStartToEndHM) => void;
}
