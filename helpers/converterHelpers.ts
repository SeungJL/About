import dayjs from "dayjs";
import { Role } from "../types/user/user";
dayjs.locale("ko");

export const birthToAge = (birth: string) => {
  if (!birth) return;
  console.log(1, birth);
  const yearSlice = birth?.slice(0, 2);
  console.log(2, yearSlice);
  const birthYear = +yearSlice < 50 ? "20" + yearSlice : "19" + yearSlice;
  console.log(3, birthYear);
  const currentYear = dayjs().year();
  console.log(4, birthYear);
  const birthDate = dayjs(birth.slice(3, 4) + "-" + birth.slice(4)).year(
    dayjs().year()
  );
  console.log(5, birthDate);
  const age = currentYear - +birthYear;
  console.log(6, age);
  if (birthDate < dayjs()) {
    return age;
  } else return age - 1;
};
export const birthToDayjs = (birth: string) =>
  dayjs(birth.slice(2, 4) + "-" + birth.slice(4, 6));

export const getRole = (role: Role) => {
  if (role === "human") return "수습 멤버";
  if (role === "manager") return "운영진";
  if (role === "member") return "동아리원";
  if (role === "noMember") return "외부인";
  if (role === "previliged") return "관리자";
  if (role === "resting") return "휴식 멤버";
  if (role === "waiting") return "대기 인원";
};
