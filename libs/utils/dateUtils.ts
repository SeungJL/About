import dayjs, { Dayjs } from "dayjs"
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { RESULT_CLOSE_TIME, RESULT_OPEN_TIME } from "../../constants/system";

dayjs.extend(utc)
dayjs.extend(timezone)

const TZ_SEOUL = 'Asia/Seoul'

const dayEnToKr = {
  'Sun': '일',
  'Mon': '월',
  'Tue': '화',
  'Wed': '수',
  'Thu': '목',
  'Fri': '금',
  'Sat': '토',
}

export const strToDate = (dateStr: string) => {
  return dayjs(dateStr, 'YYYY-MM-DD').tz(TZ_SEOUL).startOf('day')
}

export const toDate = (raw: string | Date) => {
  let dayjsDate: Dayjs
  if (typeof(raw) === 'string') 
    dayjsDate = strToDate(raw)
  else
    dayjsDate = dayjs(raw).tz(TZ_SEOUL).startOf('day')

  return dayjs(dayjsDate).tz(TZ_SEOUL).startOf('day')
}

export const getToday = () => {
  const currentTime = dayjs().tz(TZ_SEOUL)

  return dayjs().tz(TZ_SEOUL).startOf('day')
}

export const getInterestingDate = () => {
  const currentTime = dayjs().tz(TZ_SEOUL)
  const today = dayjs().tz(TZ_SEOUL).startOf('day')
  
  if (currentTime < today.hour(14)) 
    return today
  return today.add(1, 'day')
}

export const getNextDate = (raw: string | Date) => (
  toDate(raw).add(1, 'day')
)

export const getPreviousDate = (raw: string | Date) => (
  toDate(raw).add(-1, 'day')
)

export const now = () => (
  dayjs().tz(TZ_SEOUL)
)

export const dateToDayjs = (date: Date) => (
  dayjs(date).tz(TZ_SEOUL)
)

export const convertToKr = (date: Dayjs) => 
  `${date.format('YYYY년 MM월 DD일')}(${dayEnToKr[date.format('ddd')]})`

export const canShowResult = () => {
  const now = dayjs().tz(TZ_SEOUL)

  const interestingDate = getInterestingDate()
  const resultOpenTime = interestingDate.add(-1, 'day').hour(RESULT_OPEN_TIME)
  const resultCloseTime = interestingDate.hour(RESULT_CLOSE_TIME)

  return resultOpenTime <= now && now < resultCloseTime
}

export const splitDate = (date: Dayjs) => (
  [date.tz(TZ_SEOUL).hour(), date.tz(TZ_SEOUL).minute()]
)

export const hourMinToDate = (hour: number, min: string) => (
  getInterestingDate().hour(hour).minute(parseInt(min, 10))
)