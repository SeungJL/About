import { Dayjs } from "dayjs";

export interface ITimeStartToEndHM {
  start?: ITime;
  end?: ITime;
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

export interface ITime {
  hours?: number;
  minutes?: number;
}

export interface IImageSliderItem {
  image: string;
  title: string;
  id: number;
}
