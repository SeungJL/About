import { Dayjs } from "dayjs"
import { hourMinToDate } from "./dateUtils"

export const getOptimalTime = (times: string[]) => {
  const hourMinutes = times
    .filter((t) => !!t)
    .map((t) => {
      const [rawHour, rawMinute] = t.split(':')

      const hour = parseInt(rawHour)
      const minute = parseInt(rawMinute)

      return { hour, minute }
    })
    .sort((a, b) => (a.hour - b.hour + (a.hour === b.hour ? a.minute - b.minute : 0)))
  
  if (hourMinutes.length === 0) return '13:00'
  if (hourMinutes.length === 1) return `${hourMinutes[0].hour}:${String(hourMinutes[0].minute).padStart(2, '0')}`
  
  return `${hourMinutes[1].hour}:${String(hourMinutes[1].minute).padStart(2, '0')}`
}

export const getOptimalTime2 = (times: { start: Dayjs, end: Dayjs }[]) => {
  times.sort((a, b) => a.start.unix() - b.start.unix())

  switch (times.length) {
    case 0:
      return hourMinToDate(13, '00')
    case 1:
      return times[0].start
    default:
      return times[1].start
  }
}