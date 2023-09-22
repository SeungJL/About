import { Role } from "../types/user/user";

export const RANKING_ANONYMOUS_USERS = ["2653213703"];

export const USER_ROLE: Record<Role, string> = {
  human: "수습 멤버",
  manager: "운영진",
  member: "동아리원",
  noMember: "외부인",
  previliged: "관리자",
  resting: "휴식 멤버",
  waiting: "대기 인원",
};
