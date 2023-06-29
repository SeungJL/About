import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { STUDY_VOTE_START_HOUR } from "../../constants/study";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ_SEOUL = "Asia/Seoul";

export const now = () => dayjs().tz(TZ_SEOUL);

export const getToday = () => now().startOf("day");

export const getTomorrow = () => getToday().add(1, "day");

export const getYesterday = () => getToday().subtract(1, "day");

export const getMonth = () => getToday().month();

export const getInterestingDate = () => {
  const today = getToday();
  const current = now();
  if (current < today.hour(STUDY_VOTE_START_HOUR)) return today;
  return today.add(1, "day");
};

export const strToDate = (dateStr: string) => {
  return dayjs(dateStr, "YYYY-MM-DD").tz(TZ_SEOUL).startOf("day");
};
export const dateToDayjs = (date: Date) => dayjs(date).tz(TZ_SEOUL);

/** strToDate와 dateToDayjs 만으로 충분한 거 같아서 이후 삭제 */
export const toDate = (raw: string | Date) => {
  let dayjsDate: Dayjs;
  if (typeof raw === "string") dayjsDate = strToDate(raw);
  else dayjsDate = dayjs(raw).tz(TZ_SEOUL).startOf("day");

  return dayjs(dayjsDate).tz(TZ_SEOUL).startOf("day");
};

/** 특정 날짜를 기준으로 다음 날 */
export const getNextDate = (raw: string | Date) => toDate(raw).add(1, "day");

export const getPreviousDate = (raw: string | Date) =>
  toDate(raw).add(-1, "day");

/** dayjs() 타입에서 시간과 분을 숫자로 가져온다*/
export const splitDate = (date: Dayjs) => [
  date.tz(TZ_SEOUL).hour(),
  date.tz(TZ_SEOUL).minute(),
];

/** 이후 삭제 예정 */
export const hourMinToDate = (hour: number, min: string) =>
  getInterestingDate().hour(hour).minute(parseInt(min, 10));

/** 유저가 스터디 참여했는지에 따라 default */
export const getDefaultVoteDate = (isUserAttend: boolean) => {
  const current = now();
  const today = getToday();
  const startHour = today.hour(STUDY_VOTE_START_HOUR);
  if (isUserAttend && current < now().hour(18)) {
    return today;
  }
  if (current < startHour) {
    return today;
  }

  return today.add(1, "day");
};

export const birthToDayjs = (birth: string) =>
  dayjs(birth.slice(2, 4) + "-" + birth.slice(4, 6));
