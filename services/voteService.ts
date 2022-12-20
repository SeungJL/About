import { MIN_USER_FOR_STUDY, MAX_USER_PER_PLACE, VOTE_END_HOUR } from "../constants/system"
import { dateToDayjs, now, strToDate } from "../libs/utils/dateUtils"
import { openable, getOptimalTime2 } from "../libs/utils/timeUtils"
import { IParticipation, Vote } from "../models/vote"

export const findOneVote = ( date: Date ) => (
  Vote.findOne({ date }).populate([
    'participations.place',
    'participations.attendences.user',
    'participations.invitations.user',
    'participations.absences.user',
  ])
)
export const confirm = async (dateStr: string) => {
  const date = strToDate(dateStr).toDate()
  
  const vote = await Vote.findOne({ date })

  const sources = vote.participations.filter((participation: IParticipation) => {
    const attendenceCnt = participation.attendences.length
    const unconfirmedCnt = participation.attendences.filter((att) => !att.confirmed).length

    return attendenceCnt === 1 && unconfirmedCnt === 1
  })

  for (let i=0; i<sources.length; i++) {
    const sourceParticipation = sources[i]
    
    const sourcePlaceId = sourceParticipation.place.toString()
    const attendence = sourceParticipation.attendences[0]

    // 1명 장소 -> 2명 장소
    const targetParticipation1 = vote.participations
      .filter((p) => p.place.toString() !== sourcePlaceId)
      .find((p) => MIN_USER_FOR_STUDY-1 === p.attendences.length)

    if (targetParticipation1) {
      targetParticipation1.attendences = [...targetParticipation1.attendences, attendence]
      sourceParticipation.attendences = []

      break
    }

    // 1명 장소 -> 3명 이상 장소
    const targetParticipation2 = vote.participations
    .filter((p) => p.place.toString() !== sourcePlaceId)
    .find((p) => p.attendences.length < MAX_USER_PER_PLACE && openable([
      ...p.attendences.map((att) => att.time),
      attendence.time,
    ]))
    
    if (targetParticipation2) {
      targetParticipation2.attendences = [
        ...targetParticipation2.attendences,
        attendence,
      ]
      sourceParticipation.attendences = []

      break
    }
  }

  vote.participations
    .flatMap((p) => p.attendences)
    .forEach((att) => {
      att.confirmed = true
    })
  
  // 결과 확정 및 모임 날짜 확정
  vote.participations.forEach((participation) => {
    const participationTimes = participation.attendences.map((att) => att.time)

    if (openable(participationTimes)) {
      participation.status = 'open'
    } else {
      participation.status = 'dismissed'
      participation.desc = participation.attendences.length >= MIN_USER_FOR_STUDY ?
        `최소 ${MIN_USER_FOR_STUDY}명의 참여시간이 1시간 이상 겹치지 않아요` : `인원이 부족해요 (최소 인원: ${MIN_USER_FOR_STUDY})`
    }

    const times = participation.attendences.map((p) => ({
      start: dateToDayjs(p.time.start),
      end: dateToDayjs(p.time.end),
    }))

    participation.time = getOptimalTime2(times).toDate()
  })

  await vote.save()
}

export const confirmWithValidating = async (dateStr) => {
  const dayjsDate = strToDate(dateStr)
  const voteEndTime = dayjsDate
    .subtract(1, 'day')
    .add(VOTE_END_HOUR, 'hour')

  if (now() < voteEndTime) {
    return false
  }

  const vote = await Vote.findOne({ date: dayjsDate.toDate() })
  if (vote.participations.some((p) => p.status === 'pending')) {
    confirm(dateStr)
    return true
  }

  return false
}