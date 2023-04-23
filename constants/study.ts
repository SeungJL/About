import { Location } from "../types/system";

export const MAX_USER_PER_PLACE = 8;
export const MIN_USER_FOR_STUDY = 3;

export const RESULT_OPEN_TIME = 14;
export const RESULT_CLOSE_TIME = 14;

export const START_HOUR = 10;
export const END_HOUR = 22;

export const VOTE_START_HOUR = 14;
export const VOTE_END_HOUR = 22;

export const VOTER_DATE_END = 18;

export const STUDY_TIME_TABLE = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

export const TIME_SELECTOR_START = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
export const TIME_SELECTOR_END = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

export const SUWAN_투썸 = "64395f1e8d1edf4e056e993d";
export const SUWAN_탐앤탐스 = "640c271121863deff358f459";
export const SUWAN_카탈로그 = "62e5d6e0e098c232c05c3d3f";
export const SUWAN_아티제 = "63625f1d958585371af0248b";
export const YANG_위카페 = "6437e9d7ab537b843c6143ac";
export const YANG_할리스 = "6437ea69ab537b843c6143ad";
export const YANG_파스쿠찌 = "6437eb3fab537b843c6143ae";
export const YANG_스타벅스 = "6437ebccab537b843c6143af";

export const SPACE_NAME = {
  "64395f1e8d1edf4e056e993d": "투썸플레이스",
  "640c271121863deff358f459": "탐앤탐스",
  "62e5d6e0e098c232c05c3d3f": "카탈로그",
  "63625f1d958585371af0248b": "아티제",
  "6437e9d7ab537b843c6143ac": "위카페",
  "6437ea69ab537b843c6143ad": "할리스",
  "6437eb3fab537b843c6143ae": "파스쿠찌",
  "6437ebccab537b843c6143af": "스타벅스",
};

export const SPACE_LOCATION = {
  [SUWAN_아티제]: "수원",
  [SUWAN_카탈로그]: "수원",
  [SUWAN_탐앤탐스]: "수원",
  [SUWAN_투썸]: "수원",
  [YANG_스타벅스]: "양천",
  [YANG_위카페]: "양천",
  [YANG_파스쿠찌]: "양천",
  [YANG_할리스]: "양천",
};

export const STUDY_SPACE_INFO = [
  {
    id: SUWAN_카탈로그,
    location: "경기 수원시 팔달구 아주로 47번길 13",
    time: "12:00 - 22:00",
  },
  {
    id: SUWAN_탐앤탐스,
    location: "경기 수원시 팔달구 매산로 1",
    time: "08:00 - 24:00",
  },
  {
    id: SUWAN_아티제,
    location: "경기 수원시 영통구 센트럴타운로 85",
    time: "09:00 - 22:30",
  },
  {
    id: SUWAN_투썸,
    location: "경기 수원시 팔달구 인계로 166번길 48-15",
    time: "09:00 - 24:00",
  },
  {
    id: YANG_위카페,
    location: "서울특별시 강서구 등촌동 648-5 1층",
    time: "08:00 ~ 21:00",
  },
  {
    id: YANG_할리스,
    location: "서울특별시 영등포구 당산제2동 당산로 219",
    time: "08:00 ~ 01:00",
  },
  {
    id: YANG_파스쿠찌,
    location: "서울특별시 강서구 화곡동 897-14",
    time: "08:00 ~ 00:00",
  },
  {
    id: YANG_스타벅스,
    location: "서울특별시 양천구 신목로 354",
    time: "07:00 ~ 23:00",
  },
];
