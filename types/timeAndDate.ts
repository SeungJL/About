import { Dayjs } from "dayjs";

export interface ITime {
  hours?: number;
  minutes?: number;
}

export interface ITimeStartToEnd {
  start?: ITime;
  end?: ITime;
}

export interface ITimeSelector {
  times: ITimeStartToEnd;
  setTimes: ({ start, end }: ITimeStartToEnd) => void;
}

export interface IDayjsStartToEnd {
  start?: Dayjs;
  end?: Dayjs;
}
