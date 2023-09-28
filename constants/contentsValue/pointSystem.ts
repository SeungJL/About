export const POINT_SYSTEM_PLUS = {
  STUDY_ATTEND: { value: 5, message: "스터디 출석" },
  STUDY_VOTE: {
    score: { value: 5, message: "스터디 투표" },
    point: { value: 5, message: "스터디 투표" },
    inviteScore: { value: 2, message: "친구 초대 보너스" },
    invitePoint: { value: 2, message: "친구 초대 보너스" },
  },
  DAILY_ATTEND: { value: 5, message: "일일 출석" },
  voteStudyDaily: { value: 2, message: "당일 참여" },
  PROMOTION: { value: 50, message: "홍보 리워드" },
  suggest: { value: 3, message: "건의사항" },
  LIKE: { value: 3, message: "좋아요" },
};

export const POINT_SYSTEM_MINUS = {
  timeChange: {
    deposit: { value: -100, message: "스터디 시작 이후 시간 변경" },
  },
  attendCheck: {
    deposit: { value: -100, message: "스터디 지각" },
  },
  cancelStudy: {
    score: { value: -5, message: "투표 취소" },
    point: { value: -5, message: "투표 취소" },
  },
  absentStudy: {
    deposit: { value: -300, message: "당일 불참(스터디 시작 이전)" },
    depositLate: { value: -600, message: "당일 불참(스터디 시작 이후)" },
  },
};
