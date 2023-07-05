import { Dayjs } from "dayjs";

export const dayjsToStr = (date: Dayjs) => date.format("YYYY-MM-DD");
