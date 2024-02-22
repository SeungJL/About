import { IButtonCardProps } from "../../components2/molecules/cards/ButtonCard";

export const POINT_SYSTEM_PLUS = {
  STUDY_ATTEND_CHECK: { value: 5, message: "스터디 출석" },
  STUDY_PRIVATE_ATTEND: { value: 2, message: "개인 스터디 인증" },
  STUDY_VOTE: {
    first: { value: 10, message: "스터디 투표" },
    second: { value: 5, message: "스터디 투표" },
    third: { value: 2, message: "스터디 투표" },
  },
  STUDY_INVITE: { value: 2, message: "친구 초대 보너스" },
  DAILY_ATTEND: { value: 3, message: "일일 출석" },
  PROMOTION: { value: 100, message: "홍보 리워드" },
  LIKE: { value: 2, message: "좋아요" },
};

export const POINT_SYSTEM_Deposit = {
  STUDY_TIME_CHANGE: {
    value: -100,
    message: "스터디 시작 이후 시간 변경",
  },
  STUDY_PRIVATE_ABSENT: {
    value: -100,
    message: "개인 스터디 미 인증",
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

export const POINT_GET_ACTIBITY_LIST: Omit<IButtonCardProps, "func">[] = [
  {
    title: "스터디 투표",
    subTitle: "스터디에 투표만 해도!",
    buttonText: "5P",
  },
  {
    title: "스터디 사전 투표",
    subTitle: "먼저 투표하면 추가 포인트",
    buttonText: "10P",
  },
  {
    title: "스터디 장소 선택",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
  {
    title: "스터디 출석",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
  {
    title: "개인 스터디",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
  {
    title: "FREE 스터디",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
];

export const POINT_GET_EVENT_LIST: Omit<IButtonCardProps, "func">[] = [
  {
    title: "친구 초대",
    subTitle: "스터디 친구 초대",
    buttonText: "5P",
  },
  {
    title: "매일매일 출석체크",
    subTitle: "먼저 투표하면",
    buttonText: "5P",
  },
  {
    title: "홍보 이벤트",
    subTitle: "모임 개설",
    buttonText: "5P",
  },
  {
    title: "모임 개설",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
  {
    title: "소그룹 개설",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
  {
    title: "건의하기",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
  {
    title: "열활멤버",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
  {
    title: "스터디 장소 추천",
    subTitle: "여러 곳 투표하면",
    buttonText: "5P",
  },
];
