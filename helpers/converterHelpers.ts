import dayjs from "dayjs";
import { SCHEME_TO_COLOR } from "../constants/styles";
import { GatherStatus } from "../types/page/gather";

dayjs.locale("ko");

// 생년월일 to 만 나이
export const birthToAge = (birth: string) => {
  if (!birth) return;
  const yearSlice = birth?.slice(0, 2);
  const birthYear = +yearSlice < 50 ? "20" + yearSlice : "19" + yearSlice;
  const currentYear = dayjs().year();
  const birthDate = dayjs(birth.slice(2, 4) + "-" + birth.slice(4)).year(
    dayjs().year()
  );
  const age = currentYear - +birthYear;
  if (birthDate < dayjs()) return age;
  else return age - 1;
};

//생년월일 to Dayjs
export const birthToDayjs = (birth: string) =>
  dayjs(birth.slice(2, 4) + "-" + birth.slice(4, 6));

//차크라 색상 to 일반 색상
export const schemeToColor = (scheme: string) =>
  SCHEME_TO_COLOR[scheme] || scheme;

