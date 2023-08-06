import dayjs from "dayjs";

export const NOTICE_ALERT = "noticeAlert18";
export const USER_GUIDE = dayjs().date(1).format("YYYYMMDD") + "userGuide";
export const SUGGEST_POP_UP = "suggest";
// export const POP_UP = dayjs().date(1).format("YYYYMMDD") + "popUp";
export const ATTEND_POP_UP = dayjs().day(1).format("YYYYMMDD") + "attend";

export const PROFILE_POP_UP = dayjs().format("YYYYMMDD") + "profile";

export const PROMOTION_POP_UP1 =
  dayjs().day(3).format("YYYYMMDD") + "promotion";

export const PROMOTION_POP_UP2 =
  dayjs().day(6).format("YYYYMMDD") + "promotion";

export const GATHER_ALERT = "gatherAlert";

export const POINT_ALERT = "pointAlert";
