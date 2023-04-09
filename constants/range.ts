import dayjs from "dayjs";

export const CHART_MONTH_RANGE = [
  {
    start: dayjs().subtract(2, "month").startOf("month"),
    end: dayjs().subtract(2, "month").endOf("month"),
  },
  {
    start: dayjs().subtract(1, "month").startOf("month"),
    end: dayjs().subtract(1, "month").endOf("month"),
  },
  {
    start: dayjs().startOf("month"),
    end: dayjs().endOf("month"),
  },
];
