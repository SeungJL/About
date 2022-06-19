export const attendStatus = {
  high: '높음',
  normal: '보통',
  low: '저조',
  warn: '경고',
  danger: '위험',
}

export const getAttendStatus = (
  week1OpenCnt: number,
  week1VoteCnt: number,
  week2OpenCnt: number,
  week2VoteCnt: number,
  week4OpenCnt: number,
  week4VoteCnt: number,
) => {
  const week1Cnt = week1OpenCnt * 2 + (week1VoteCnt - week1OpenCnt)
  const week2Cnt = (week2OpenCnt - week1OpenCnt) * 2 + (week2VoteCnt - week1VoteCnt - (week2OpenCnt - week1OpenCnt))
  const week4Cnt = (week4OpenCnt - week2OpenCnt) * 2 + (week4VoteCnt - week2VoteCnt - (week4OpenCnt - week2OpenCnt))
  const attendenceScore = week1Cnt * 10 + week2Cnt * 5 + week4Cnt * 3

  if (attendenceScore < 3) {
    return attendStatus.danger
  } else if (attendenceScore < 6) {
    return attendStatus.warn
  } else if (attendenceScore < 10) {
    return attendStatus.low
  } else if (attendenceScore > 60) {
    return attendStatus.high
  }
  return attendStatus.normal
}