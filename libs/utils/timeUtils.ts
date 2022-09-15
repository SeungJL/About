import { Dayjs } from "dayjs"
import { END_HOUR, MIN_USER_FOR_STUDY, START_HOUR } from "../../constants/system"
import { IParticipantTime } from "../../models/vote"
import { dateToDayjs, hourMinToDate } from "./dateUtils"

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22]
const MINUTES = ['00', '30']

const timeRange: number[] = []
for (let i=START_HOUR; i<END_HOUR; i+=1/2) {
  timeRange.push(i)
}

// 스터디 최소 인원이 겹치는 시간이 2시간 이상인지 판단
const openable = (participationTimes: IParticipantTime[]) => {
  const timeOccurrance = timeRange.map((t) => 0)

  participationTimes
    .flatMap((participationTime) => {
      const { start, end } = participationTime
      const startDayjs = dateToDayjs(start)
      const endDayjs = dateToDayjs(end)

      const startNum = startDayjs.hour() + startDayjs.minute() / 60
      const endNum = endDayjs.hour() + endDayjs.minute() / 60

      return timeRange.filter((t) => (startNum <= t && t < endNum))
    })
    .forEach((val) => {
      const idx = timeRange.indexOf(val)
      timeOccurrance[idx]++
    }, timeOccurrance)

    return timeOccurrance
      .map((val) => (val >= MIN_USER_FOR_STUDY))
      .reduce((acc, cur) => {
        if (acc >= 2) return acc  // 최소 스터디인원이 겹치는 시간이 1시간 이상이면 오픈 가능
        if (cur) return acc + 1
        return 0
      }, 0) >= 2  // 1시간 이상
}

// 혼자 시간이 안 겹치는지 판단
const getCommonTime = (participationTimes: IParticipantTime[]) => {
  const timeOccurrance = timeRange.map((t) => 0)

  participationTimes
    .flatMap((participationTime) => {
      const { start, end } = participationTime
      const startDayjs = dateToDayjs(start)
      const endDayjs = dateToDayjs(end)

      const startNum = startDayjs.hour() + startDayjs.minute() / 60
      const endNum = endDayjs.hour() + endDayjs.minute() / 60

      return timeRange.filter((t) => (startNum <= t && t < endNum))
    })
    .forEach((val) => {
      const idx = timeRange.indexOf(val)
      timeOccurrance[idx]++
    }, timeOccurrance)

    return timeOccurrance.map((val) => (val >= 2))
}

const isAlone = (participationTime: IParticipantTime, commonTime: boolean[]) => {
  const { start, end } = participationTime
  const startDayjs = dateToDayjs(start)
  const endDayjs = dateToDayjs(end)

  const startNum = startDayjs.hour() + startDayjs.minute() / 60
  const endNum = endDayjs.hour() + endDayjs.minute() / 60

  const myTime = timeRange.filter((t) => (startNum <= t && t < endNum))
  
  return myTime
    .map((t) => timeRange.indexOf(t))
    .filter((idx) => commonTime[idx]).length === 0
}

const getOptimalTime = (times: string[]) => {
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

const getOptimalTime2 = (times: { start: Dayjs, end: Dayjs }[]) => {
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

export {
  HOURS,
  MINUTES,
  timeRange,
  openable,
  getCommonTime,
  isAlone,
  getOptimalTime,
  getOptimalTime2,
}
