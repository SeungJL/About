import dayjs from "dayjs"

export const getInterestingDate = () => {
  const currentTime = dayjs()

  const today = dayjs().startOf('day')
  if (currentTime < today.hour(15)) 
    return today
  return today.add(1, 'day')
}