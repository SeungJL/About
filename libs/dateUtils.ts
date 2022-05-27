import dayjs from "dayjs"
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)
dayjs.extend(timezone)

const TZ_SEOUL = 'Asia/Seoul'

export const getInterestingDate = () => {
  const currentTime = dayjs().tz(TZ_SEOUL)
  const today = dayjs().tz(TZ_SEOUL).startOf('day')
  
  if (currentTime < today.hour(15)) 
    return today
  return today.add(1, 'day')
}