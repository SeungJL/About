import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ_SEOUL = "Asia/Seoul";

export const now = () => dayjs().tz(TZ_SEOUL);

export const getToday = () => now().startOf("day");

export const getMonth = () => getToday().month();

export const strToDate = (dateStr: string) => {
  return dayjs(dateStr, "YYYY-MM-DD").tz(TZ_SEOUL).startOf("day");
};

export const toDate = (raw: string | Date) => {
  let dayjsDate: Dayjs;
  if (typeof raw === "string") dayjsDate = strToDate(raw);
  else dayjsDate = dayjs(raw).tz(TZ_SEOUL).startOf("day");

  return dayjs(dayjsDate).tz(TZ_SEOUL).startOf("day");
};

export const dayjsToStr = (date: Dayjs) => date.format("YYYY-MM-DD");

export const getWeekNumber = (date: Dayjs) => {
  const startDay = date.startOf("month").day();
  const currentDate = date.date();
  return Math.ceil((currentDate - startDay) / 7) + 2;
};

export const getDateDiff = (date: Dayjs) => {
  const daysDiff = dayjs().diff(date, "day");

  if (daysDiff < 1) {
    const hoursDiff = dayjs().diff(date, "hour");
    if (hoursDiff < 1) return "방금 전";
    return `${dayjs().diff(date, "hours")}시간 전`;
  }
  return `${daysDiff}일 전`;
};
