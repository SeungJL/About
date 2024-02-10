import dayjs from "dayjs";
import { SCHEME_TO_COLOR } from "../constants/styles";
import {
  ActiveLocation,
  LocationEn,
} from "../types/serviceTypes/locationTypes";

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

type ReturnLocationLang<T> = T extends "kr" ? ActiveLocation : LocationEn;

export const convertLocationLangTo = <T extends "kr" | "en">(
  location: ActiveLocation | LocationEn,
  to: T
): ReturnLocationLang<T> => {
  const krToEnMapping: Record<ActiveLocation, LocationEn> = {
    수원: "suw",
    강남: "gan",
    동대문: "don",
    안양: "any",
    양천: "yan",
  };

  const enToKrMapping: Record<LocationEn, ActiveLocation> = {
    suw: "수원",
    gan: "강남",
    don: "동대문",
    any: "안양",
    yan: "양천",
  };

  if (to === "kr") {
    return enToKrMapping[location as LocationEn] as ReturnLocationLang<T>;
  }
  if (to === "en") {
    return krToEnMapping[location as ActiveLocation] as ReturnLocationLang<T>;
  }

  throw new Error("Invalid 'to' parameter or location type");
};
