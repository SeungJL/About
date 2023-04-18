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

export const MONTH_LIST=[
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
]