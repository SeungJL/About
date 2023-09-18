import dayjs from "dayjs";

export const checkAndSetLocalStorage = (key: string, gap: number) => {
  let temp = true;
  const value = localStorage.getItem(key);

  if (!value || dayjs(value).add(gap, "day") <= dayjs()) {
    localStorage.setItem(key, dayjs().format("YYYYMMDD"));
    temp = false;
  }

  return temp;
};

