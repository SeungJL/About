import { Dayjs } from "dayjs";

export interface ITimeStartToEnd {
  start?: {
    hour?: number;
    minutes?: number;
  };
  end?: {
    hour?: number;
    minutes?: number;
  };
}

export interface IParticipantTime {
  start?: Dayjs;
  end?: Dayjs;
}
