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
  const week1Cnt = week1OpenCnt + week1VoteCnt / 2
  const week2Cnt = week2OpenCnt + week2VoteCnt / 2
  const week4Cnt = week4OpenCnt + week4VoteCnt / 2

  if (week1Cnt >= 3) return attendStatus.high
  if (week4Cnt >= 2 && week2Cnt == 1 && week1Cnt == 0) return attendStatus.low
  if (week4Cnt <= 1 && week2Cnt == 0) return attendStatus.warn
  if (week4Cnt == 0) return attendStatus.danger
  
  return attendStatus.normal
}