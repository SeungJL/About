import dayjs from "dayjs";
import { IInteractionLikeStorage } from "../types/interaction";
import { dayjsToStr } from "./dateHelpers";

export const checkAndSetLocalStorage = (key: string, gap: number) => {
  let temp = true;
  const value = localStorage.getItem(key);

  if (!value || dayjs(value).add(gap, "day") <= dayjs()) {
    localStorage.setItem(key, dayjs().format("YYYYMMDD"));
    temp = false;
  }

  return temp;
};

export const pushArrToLocalStorage = (key: string, uid: string) => {
  const currentDateStr = dayjsToStr(dayjs());
  const stored: IInteractionLikeStorage[] = JSON.parse(
    localStorage.getItem(key)
  );
  const changed = stored?.length
    ? stored.map((item) =>
        item.uid === uid ? { ...item, date: currentDateStr } : item
      )
    : [{ uid, date: currentDateStr }];
  localStorage.setItem(key, JSON.stringify(changed));
};
