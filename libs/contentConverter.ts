import { Role } from "../types/user";

export const getRole = (role: Role) => {
  if (role === "human") return "수습 멤버";
  if (role === "manager") return "운영진";
  if (role === "member") return "동아리원";
  if (role === "noMember") return "외부인";
  if (role === "previliged") return "관리자";
  if (role === "resting") return "휴식 멤버";
  if (role === "waiting") return "대기 인원";
};

