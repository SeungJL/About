import dayjs from "dayjs";

export const NOTICE_ALERT = "noticeAlert23";
export const USER_GUIDE = dayjs().date(26).format("YYYYMMDD") + "userGuide";
export const SUGGEST_POP_UP = "suggest";
// export const POP_UP = dayjs().date(1).format("YYYYMMDD") + "popUp";
export const ATTEND_POP_UP = dayjs().day(1).format("YYYYMMDD") + "attend";

export const PROFILE_POP_UP = dayjs().format("YYYYMMDD") + "profile";

export const PROMOTION_POP_UP = "promotion";

export const GATHER_ALERT = "gatherAlert";

export const POINT_ALERT = "pointAlert";

export const ATTEND_CHECK = dayjs().format("YYYYMMDD") + "attendCheck";

export const LIKE_HEART = "LikeHeart";

export const LIKE_HEART_CNT = "likeHeartCnt";

export const RABBIT_RUN = "rabbitRun" + dayjs().format("YYYYMMDD");
