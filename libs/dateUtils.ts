import dayjs from "dayjs"
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

출처: https://mik-a.com/79 [믹아의 개발일기:티스토리]

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