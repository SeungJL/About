import dayjs from "dayjs";
import { IStoreGift } from "../types/page/store";

require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("ko");
export const STORE_GIFT: IStoreGift[] = [
  {
    image:
      "https://user-images.githubusercontent.com/84257439/260282119-ed4c2166-a487-4de5-a263-5f5db38cff45.png",
    name: "3000원 상품권",
    brand: "CU",
    point: 40,
    winner: 2,
    max: 15,
    giftId: 7,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/260282114-2ebf166b-ca27-443f-9023-65c691ca6c7a.png",
    name: "5000원 상품권",
    brand: "던킨 도넛",
    point: 50,
    winner: 2,
    max: 20,
    giftId: 8,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/260282118-30d17408-69b6-447b-9d71-578e4cb10939.png",
    name: "5000원 상품권",
    brand: "공차",
    point: 100,
    winner: 2,
    max: 10,
    giftId: 9,
  },

  {
    image:
      "https://user-images.githubusercontent.com/84257439/260282121-bd1d2655-f2c5-4574-8818-41872b6f398b.png",
    name: "5000원 상품권",
    brand: "다이소",
    point: 50,
    winner: 1,
    giftId: 10,
    max: 10,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/260282404-f9f84fe6-c6e4-4a2f-b4e9-b3024eb233bd.png",
    name: "10000원 상품권",
    brand: "투썸",
    point: 120,
    winner: 1,
    giftId: 11,
    max: 8,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/236386468-bdc54ad1-1a42-4bf6-958e-189077172a72.png",
    name: "10000원 상품권",
    brand: "올리브영",
    point: 200,
    winner: 1,
    giftId: 12,
    max: 5,
  },
];
export const STORE_GIFT_LAST: IStoreGift[] = [
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454464-078f3854-4667-42ce-a228-5a30d9c7974c.png",
    name: "허쉬 초콜릿드링크",
    brand: "허쉬",
    point: 10,
    winner: 3,
    max: 10,

    giftId: 1,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/236386764-66c02335-b91a-468d-9255-40bddecadbd3.png",
    name: "싱글레귤러 아이스크림",
    brand: "베스킨라빈스",
    point: 20,
    winner: 2,
    max: 10,

    giftId: 2,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454461-dbbe68dd-4c36-458b-9f38-296f9ae5dfe2.png",
    name: "아메리카노",
    brand: "스타벅스",
    point: 30,
    winner: 2,

    max: 10,
    giftId: 3,
  },

  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454456-490f1cfb-41aa-4579-b993-fb8dc53d7db1.png",
    name: "초코 브라우니",
    brand: "설빙",
    point: 60,
    winner: 1,

    giftId: 4,
    max: 10,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/236386468-bdc54ad1-1a42-4bf6-958e-189077172a72.png",
    name: "기프트카드 10000원권",
    brand: "올리브영",
    point: 70,
    winner: 1,

    giftId: 5,
    max: 7,
  },
  {
    image:
      "https://user-images.githubusercontent.com/84257439/235454460-07e32553-3be0-41f2-8e3e-801c2ecdf059.png",
    name: "황금올리브 치킨 세트",
    brand: "BBQ",
    point: 100,
    winner: 1,

    giftId: 6,
    max: 10,
  },
];
