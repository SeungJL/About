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
    .reduce((pre, cur, _) => pre < cur ? cur : pre, Number.MAX_VALUE)

  let optimalTime = '01:00'   // 아무도 시간을 정하지 않은 경우
  if (epochTimes !== Number.MAX_VALUE) {
    const hour = Math.floor(epochTimes / 60)
    const minute = epochTimes % 60

    optimalTime = `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute }`  
  }

  return optimalTime
}