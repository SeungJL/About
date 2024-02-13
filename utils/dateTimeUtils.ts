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

export const parseTimeToDayjs = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number); // "14:00"을 시간과 분으로 분리하고 숫자로 변환
  const now = new Date(); // 현재 날짜와 시간의 Date 객체
  now.setHours(hours, minutes, 0, 0); // 시간과 분 설정 (초와 밀리초는 0으로 설정)

  return dayjs(now);
};
