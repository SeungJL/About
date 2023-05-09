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
export const TIME_SELECTOR_MINUTES = ["00", "30"];

//수원
export const SUWAN_투썸 = "64395f1e8d1edf4e056e993d";
export const SUWAN_탐앤탐스 = "640c271121863deff358f459";
export const SUWAN_카탈로그 = "62e5d6e0e098c232c05c3d3f";
export const SUWAN_아티제 = "63625f1d958585371af0248b";
export const SUWAN_커피빈 = "644f6ffe9edb56992ccda5e9";
export const SUWAN_칸나 = "644f70529edb56992ccda5eb";

//양천
export const YANG_위카페 = "6437e9d7ab537b843c6143ac";
export const YANG_할리스 = "6437ea69ab537b843c6143ad";
export const YANG_파스쿠찌 = "6437eb3fab537b843c6143ae";
export const YANG_할리스2 = "6456f0b320352b2d8758295c";

//안양
export const ANYANG_커피인더스트리 = "6456ef2820352b2d87582959";
export const ANYANG_숨맑은집 = "6456ede120352b2d87582955";
export const ANYANG_파스쿠찌 = "6456eed520352b2d87582957";
export const ANYANG_인뎃커피 = "6456ef8120352b2d8758295b";

export const SPACE_NAME = {
  //수원
  "64395f1e8d1edf4e056e993d": "투썸플레이스",
  "640c271121863deff358f459": "탐앤탐스",
  "62e5d6e0e098c232c05c3d3f": "카탈로그",
  "63625f1d958585371af0248b": "아티제",
  "644f6ffe9edb56992ccda5e9": "커피빈",
  "644f70529edb56992ccda5eb": "칸나",

  //양천
  "6437e9d7ab537b843c6143ac": "위카페",
  "6437ea69ab537b843c6143ad": "할리스",
  "6437eb3fab537b843c6143ae": "파스쿠찌",
  "6456f0b320352b2d8758295c": "할리스2",

  //안양
  "6456ef2820352b2d87582959": "커피인더스트리",
  "6456ede120352b2d87582955": "숨맑은집",
  "6456eed520352b2d87582957": "파스쿠찌",
  "6456ef8120352b2d8758295b": "인뎃커피",
};

export const SPACE_LOCATION = {
  //수원
  [SUWAN_아티제]: "수원",
  [SUWAN_카탈로그]: "수원",
  [SUWAN_탐앤탐스]: "수원",
  [SUWAN_투썸]: "수원",
  [SUWAN_칸나]: "수원",
  [SUWAN_커피빈]: "수원",
  [SUWAN_칸나]: "수원",
  //양천
  [YANG_할리스2]: "양천",
  [YANG_위카페]: "양천",
  [YANG_파스쿠찌]: "양천",
  [YANG_할리스]: "양천",
  //안양
  [ANYANG_숨맑은집]: "안양",
  [ANYANG_인뎃커피]: "안양",
  [ANYANG_커피인더스트리]: "안양",
  [ANYANG_파스쿠찌]: "파스쿠찌",
};

export const STUDY_SPACE_INFO = [
  //수원
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
    id: SUWAN_커피빈,
    location: "경기 수원시 장안구 경수대로 989",
    time: "07:00 - 23:00",
  },
  {
    id: SUWAN_칸나,
    location: "경기 수원시 영통구 덕영대로 1693",
    time: "10:00 - 04:00",
  },

  //양천
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
    id: YANG_할리스2,
    location: "서울 양천구 오목로 344",
    time: "08:00 ~ 23:00",
  },

  //안양
  {
    id: ANYANG_파스쿠찌,
    location: "경기 안양시 만안구 안양로304번길 12",
    time: "09:30 ~ 23:00",
  },
  {
    id: ANYANG_숨맑은집,
    location: "경기 안양시 동안구 평촌대로223번길 44",
    time: "09:00 ~ 24:00",
  },
  {
    id: ANYANG_인뎃커피,
    location: "경기 안양시 동안구 흥안대로 530",
    time: "09:00 ~ 24:00",
  },
  {
    id: ANYANG_커피인더스트리,
    location: "경기 군포시 군포로 731",
    time: "09:00 ~ 24:00",
  },
];
