import dayjs from "dayjs";
import { IStoreGift } from "../types/store";

require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("ko");
export const STORE_GIFT: IStoreGift[] = [
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235392475-04a4cdc4-74b5-45a2-8553-d7320e361390.png",
    name: "허쉬 초콜릿드링크",
    brand: "허쉬",
    point: 10,
    winner: 4,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-05-14") },
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235392214-cb0998c6-394f-4bc1-803c-a5aee6fc323a.png",
    name: "아메리카노",
    brand: "스타벅스",
    point: 30,
    winner: 4,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-05-14") },
  },

  {
    image:
      "https://user-images.githubusercontent.com/84257439/235392590-2353cf44-e686-4231-8673-5de2f863be2e.png",
    name: "초코 브라우니",
    brand: "설빙",
    point: 50,
    winner: 2,
    date: { startDay: dayjs("2023-05-18"), endDay: dayjs("2023-05-31") },
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235392609-baee753e-5f33-4498-8c5d-52e080116bf6.png",
    name: "황금올리브 치킨 세트",
    brand: "BBQ",
    point: 100,
    winner: 1,
    date: { startDay: dayjs("2023-06-01"), endDay: dayjs("2023-06-14") },
  },
];
