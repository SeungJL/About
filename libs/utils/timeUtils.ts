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
