import dayjs, { Dayjs } from "dayjs";

export const getCurrentDate = () => dayjs().startOf("day");

export const now = () => dayjs();
export const getHour = () => dayjs().hour();
export const getMonth = () => dayjs().month();

export const strToDate = (dateStr: string) => {
  return dayjs(dateStr, "YYYY-MM-DD").startOf("day");
};

export const toDate = (raw: string | Date) => {
  let dayjsDate: Dayjs;
  if (typeof raw === "string") dayjsDate = strToDate(raw);
  else dayjsDate = dayjs(raw).startOf("day");

  return dayjs(dayjsDate).startOf("day");
};

export const dayjsToStr = (date: Dayjs) => date?.format("YYYY-MM-DD");

export const dayjsToFormat = (date: Dayjs, text: string) => date.format(text);

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

export const getDateWeek = (date: Dayjs) => {
  const firstDayOfMonth = date.startOf("month");
  const differenceInDays = date.diff(firstDayOfMonth, "day");
  return Math.floor(differenceInDays / 7) + 1;
};
