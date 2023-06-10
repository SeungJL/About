export const POINT_SYSTEM_PLUS = {
  attendCheck: {
    score: { value: 5, message: "스터디 출석" },
    point: { value: 5, message: "스터디 출석" },
  },
  voteStudy: {
    score: { value: 5, message: "스터디 투표" },
    point: { value: 5, message: "스터디 투표" },
  },
  voteStudyDaily: {
    score: { value: 2, message: "당일 참여" },
    point: { value: 2, message: "당일 참여" },
  },
  promotionReward: {
    score: { value: 15, message: "홍보 리워드" },
    point: { value: 15, message: "홍보 리워드" },
  },
  suggest: {
    score: { value: 3, message: "건의사항" },
    point: { value: 3, message: "건의사항" },
  },
};

export const POINT_SYSTEM_MINUS = {
  attendCheck: {
    deposit: { value: -300, message: "스터디 지각" },
  },
  cancelStudy: {
    score: { value: -5, message: "투표 취소" },
    point: { value: -5, message: "투표 취소" },
  },
  absentStudy: {
    depositReason: { value: -200, message: "당일 불참(인정 사유)" },
    deposit: { value: -300, message: "당일 불참(스터디 시작 이전)" },
    depositLate: { value: -500, message: "당일 불참(스터디 시작 이후)" },
  },
};
