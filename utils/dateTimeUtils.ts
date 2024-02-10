import dayjs, { Dayjs } from "dayjs";

export const dayjsToStr = (date: Dayjs) => date?.format("YYYY-MM-DD");

export const dayjsToFormat = (date: Dayjs, text: string) => date.format(text);

export const getToday = () => dayjs().startOf("day");
export const getHour = () => dayjs().hour();

export const createTimeArr = (
  startHour: number,
  endHour: number,
  offset = 0
) => {
  const timeArr = [];
  for (let i = startHour; i <= endHour; i++) {
    timeArr.push(String(i + offset) + ":00");
    if (i !== endHour) timeArr.push(i + offset + ":30");
  }
  return timeArr;
};
