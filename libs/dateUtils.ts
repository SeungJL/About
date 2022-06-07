import dayjs, { Dayjs } from "dayjs"
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

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
  return dayjs(dateStr, 'YYYY-MM-DD').tz(TZ_SEOUL)
}

export const getToday = () => {
  const currentTime = dayjs().tz(TZ_SEOUL)

  return dayjs().tz(TZ_SEOUL).startOf('day')
}

export const getInterestingDate = () => {
  const currentTime = dayjs().tz(TZ_SEOUL)
  const today = dayjs().tz(TZ_SEOUL).startOf('day')
  
  if (currentTime < today.hour(15)) 
    return today
  return today.add(1, 'day')
}

export const getNextDate = (dateStr: string) => {
  const currentDate = strToDate(dateStr)

  return currentDate.add(1, 'day')
}

export const getPreviousDate = (dateStr: string) => {
  const currentDate = strToDate(dateStr)

  return currentDate.add(-1, 'day')
}

export const convertToKr = (date: Dayjs) => 
  `${date.format('YYYY년 MM월 DD일')}(${dayEnToKr[date.format('ddd')]})`

export const canShowResult = () => {
  const now = dayjs().tz(TZ_SEOUL)

  const interestingDate = getInterestingDate()
  const resultOpenTime = interestingDate.add(-1, 'day').hour(23)
  const resultCloseTime = interestingDate.hour(15)

  return resultOpenTime <= now && now < resultCloseTime
}