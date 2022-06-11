const HOUR = 60 * 60

export const getOptimalTime = (times: string[]) => {
  const epochTimes = times
    .filter((t) => t !== '')
    .map((t) => {
      const [rawHour, rawMinute] = t.split(':')

      const hour = parseInt(rawHour)
      const minute = parseInt(rawMinute)

      const epochMinute = hour * 60 + minute
      return epochMinute
    })

  const studyEpochTime = epochTimes.length ? epochTimes[Math.floor(epochTimes.length / 2)] : 13 * HOUR

  const hour = Math.floor(studyEpochTime / 60)
  const minute = studyEpochTime % 60

  return `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute }`  
}