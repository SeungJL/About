import dayjs from "dayjs";
import { IStoreGift } from "../types/store";

require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("ko");
export const STORE_GIFT: IStoreGift[] = [
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454464-078f3854-4667-42ce-a228-5a30d9c7974c.png",
    name: "허쉬 초콜릿드링크",
    brand: "허쉬",
    point: 10,
    winner: 3,
    max: 20,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-05-14") },
    giftId: 1,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/236386764-66c02335-b91a-468d-9255-40bddecadbd3.png",
    name: "싱글레귤러 아이스크림",
    brand: "베스킨라빈스",
    point: 20,
    winner: 2,
    max: 15,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-05-14") },
    giftId: 2,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454461-dbbe68dd-4c36-458b-9f38-296f9ae5dfe2.png",
    name: "아메리카노",
    brand: "스타벅스",
    point: 30,
    winner: 2,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-05-21") },
    max: 15,
    giftId: 3,
  },

  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454456-490f1cfb-41aa-4579-b993-fb8dc53d7db1.png",
    name: "초코 브라우니",
    brand: "설빙",
    point: 60,
    winner: 2,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-05-31") },
    giftId: 4,
    max: 20,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/236386468-bdc54ad1-1a42-4bf6-958e-189077172a72.png",
    name: "기프트카드 10000원권",
    brand: "올리브영",
    point: 70,
    winner: 2,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-05-31") },
    giftId: 5,
    max: 15,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454460-07e32553-3be0-41f2-8e3e-801c2ecdf059.png",
    name: "황금올리브 치킨 세트",
    brand: "BBQ",
    point: 100,
    winner: 1,
    date: { startDay: dayjs("2023-05-08"), endDay: dayjs("2023-06-07") },
    giftId: 6,
    max: 10,
  },
];
