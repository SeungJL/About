import { IPlace } from "../models/place"
import { groupBy } from "./utils"

export const getOptimalPlace = (votedPlaces: IPlace[], totalPlaces: IPlace[]) => {
  const groupByPID = groupBy(votedPlaces, (p) => p._id.toString())

  const placeSorted = totalPlaces.map(place => {
    const cnt = groupByPID.get(place._id.toString())?.length || 0
    const priority = place.priority || Math.random() * 100000 + 10000   // 우선순위가 지정되어 있지 않으면 무작위 우선순위 배정

    return {
      place, cnt, priority,
    }
  }).sort((a, b) => {
    return b.cnt - a.cnt + (a.cnt === b.cnt ? a.priority - b.priority : 0)
  })

  return placeSorted[0].place
}
