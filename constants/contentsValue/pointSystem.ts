export const POINT_SYSTEM_PLUS = {
  STUDY_ATTEND: { value: 5, message: "스터디 출석" },
  STUDY_VOTE: { value: 5, message: "스터디 투표" },
  STUDY_INVITE: { value: 2, message: "친구 초대 보너스" },
  DAILY_ATTEND: { value: 5, message: "일일 출석" },
  STUDY_VOTE_DAILY: { value: 2, message: "당일 참여" },
  PROMOTION: { value: 100, message: "홍보 리워드" },
  suggest: { value: 3, message: "건의사항" },
  LIKE: { value: 3, message: "좋아요" },
};

export const POINT_SYSTEM_MINUS = {
  STUDY_VOTE_CANCEL: {
    value: -5,
    message: "투표 취소",
  },
};

export const POINT_SYSTEM_Deposit = {
  STUDY_TIME_CHANGE: {
    value: -100,
    message: "스터디 시작 이후 시간 변경",
  },
  STUDY_ATTEND_LATE: {
    value: -100,
    message: "스터디 지각",
  },
  STUDY_ABSENT_BEFORE: {
    value: -300,
    message: "당일 불참(스터디 시작 이전)",
  },
  STUDY_ABSENT_AFTER: {
    value: -600,
    message: "당일 불참(스터디 시작 이후)",
  },
  STUDY_MONTH_CALCULATE: {
    value: -1000,
    message: "스터디 한달 정산",
  },
};
