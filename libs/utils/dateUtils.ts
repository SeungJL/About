import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  RESULT_CLOSE_TIME,
  RESULT_OPEN_TIME,
  VOTE_END_HOUR,
  VOTE_START_HOUR,
} from "../../constants/system";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ_SEOUL = "Asia/Seoul";

const dayEnToKr = {
  Sun: "일",
  Mon: "월",
  Tue: "화",
  Wed: "수",
  Thu: "목",
  Fri: "금",
  Sat: "토",
};

export const now = () => dayjs().tz(TZ_SEOUL);

export const getToday = () => {
  return now().startOf("day");
};
export const getTomorrow = () => {
  return getToday().add(1, "day");
};
export const getYesterday = () => {
  return getToday().subtract(1, "day");
};
export const convertToKr = (date: Dayjs, format: string) => {
  return date.format(format);
};

export const getInterestingDate = () => {
  const today = getToday();
  const current = now();

  if (current < today.hour(VOTE_START_HOUR)) return today;
  return today.add(1, "day");
};

export const getMonth = () => now().month();

export const numToMonth = (day: number) => {
  return dayjs().month(day);
};

///////////////////////////////////////////////////////////////////////////////////

export const strToDate = (dateStr: string) => {
  return dayjs(dateStr, "YYYY-MM-DD").tz(TZ_SEOUL).startOf("day");
};

export const toDate = (raw: string | Date) => {
  let dayjsDate: Dayjs;
  if (typeof raw === "string") dayjsDate = strToDate(raw);
  else dayjsDate = dayjs(raw).tz(TZ_SEOUL).startOf("day");

  return dayjs(dayjsDate).tz(TZ_SEOUL).startOf("day");
};

export const getNextDate = (raw: string | Date) => toDate(raw).add(1, "day");

export const getPreviousDate = (raw: string | Date) =>
  toDate(raw).add(-1, "day");

export const dateToDayjs = (date: Date) => dayjs(date).tz(TZ_SEOUL);

export const canShowResult = () => {
  const now = dayjs().tz(TZ_SEOUL);

  const interestingDate = getInterestingDate();
  const resultOpenTime = interestingDate.add(-1, "day").hour(RESULT_OPEN_TIME);
  const resultCloseTime = interestingDate.hour(RESULT_CLOSE_TIME);

  return resultOpenTime <= now && now < resultCloseTime;
};

export const splitDate = (date: Dayjs) => [
  date.tz(TZ_SEOUL).hour(),
  date.tz(TZ_SEOUL).minute(),
];

export const hourMinToDate = (hour: number, min: string) =>
  getInterestingDate().hour(hour).minute(parseInt(min, 10));
