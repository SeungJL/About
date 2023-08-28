import { Location } from "../types/system";

export const STUDY_LOCATION: Location[] = ["수원", "양천", "안양", "강남"];

export const NOT_OPEN_LOCATION = ["강남"];

export const RegisterLocation = [...STUDY_LOCATION, "보류"];

//수원
export const SUWAN_투썸 = "64395f1e8d1edf4e056e993d";
export const SUWAN_탐앤탐스 = "640c271121863deff358f459";
export const SUWAN_카탈로그 = "62e5d6e0e098c232c05c3d3f";
export const SUWAN_투썸상현 = "64b15fb72704a3af110733ba";
export const SUWAN_커피빈 = "644f6ffe9edb56992ccda5e9";
export const SUWAN_칸나 = "644f70529edb56992ccda5eb";
export const SUWAN_이디야 = "6479f39e907daf3e8a5cda6e";
export const SUWAN_스타벅스 = "64ba45feefd3711264521a87";
//양천
export const YANG_위카페 = "6437e9d7ab537b843c6143ac";
export const YANG_할리스 = "6437ea69ab537b843c6143ad";
export const YANG_파스쿠찌 = "6437eb3fab537b843c6143ae";
export const YANG_이디야 = "6456f0b320352b2d8758295c";
export const YANG_카페베네 = "64ba43a5efd3711264521a86";
export const YANG_스타벅스 = "64bbc30787f8dc1a5210da6a";
//안양
export const ANYANG_커피인더스트리 = "6456ef2820352b2d87582959";
export const ANYANG_숨맑은집 = "6456ede120352b2d87582955";
export const ANYANG_파스쿠찌 = "6456eed520352b2d87582957";
export const ANYANG_인뎃커피 = "6456ef8120352b2d8758295b";

//강남
export const GANGNAM_신논현 = "64ecc33940f6dace3b065598";
export const GANGNAM_논현 = "64ecc3c240f6dace3b06559c";
export const GANGNAM_교대 = "64ecc41640f6dace3b06559d";
export const GANGNAM_양재 = "64ecc48d40f6dace3b06559e";
export const GANGNAM_선릉 = "64ecc54240f6dace3b0655a0";
export const GANGNAM_강남구청 = "64ecc4ef40f6dace3b06559f";
export const GANGNAM_강남 = "64ecc58540f6dace3b0655a1";

export const SPACE_NAME = {
  //수원
  [SUWAN_투썸]: "투썸플레이스",
  [SUWAN_탐앤탐스]: "탐앤탐스",
  [SUWAN_카탈로그]: "카탈로그",
  [SUWAN_투썸상현]: "투썸상현",
  [SUWAN_커피빈]: "커피빈",
  [SUWAN_칸나]: "칸나",
  [SUWAN_이디야]: "이디야",
  [SUWAN_스타벅스]: "스타벅스",
  //양천
  [YANG_위카페]: "위카페",
  [YANG_할리스]: "할리스",
  [YANG_파스쿠찌]: "파스쿠찌",
  [YANG_이디야]: "이디야",
  [YANG_카페베네]: "카페베네",
  [YANG_스타벅스]: "스타벅스",
  //안양
  [ANYANG_커피인더스트리]: "커피인더스트리",
  [ANYANG_숨맑은집]: "숨맑은집",
  [ANYANG_파스쿠찌]: "파스쿠찌",
  [ANYANG_인뎃커피]: "인뎃커피",
  //강남
  [GANGNAM_강남]: "할리스",
  [GANGNAM_강남구청]: "파스쿠찌",
  [GANGNAM_신논현]: "커피빈",
  [GANGNAM_논현]: "커피빈",
  [GANGNAM_교대]: "아펜즈커피",
  [GANGNAM_양재]: "미오커피",
  [GANGNAM_선릉]: "커피빈",
};

export const SPACE_LOCATION = {
  //수원
  [SUWAN_투썸상현]: "수원",
  [SUWAN_카탈로그]: "수원",
  [SUWAN_탐앤탐스]: "수원",
  [SUWAN_투썸]: "수원",
  [SUWAN_칸나]: "수원",
  [SUWAN_커피빈]: "수원",
  [SUWAN_칸나]: "수원",
  [SUWAN_이디야]: "수원",
  [SUWAN_스타벅스]: "수원",
  //양천
  [YANG_이디야]: "양천",
  [YANG_위카페]: "양천",
  [YANG_파스쿠찌]: "양천",
  [YANG_할리스]: "양천",
  [YANG_카페베네]: "양천",
  [YANG_스타벅스]: "양천",
  //안양
  [ANYANG_숨맑은집]: "안양",
  [ANYANG_인뎃커피]: "안양",
  [ANYANG_커피인더스트리]: "안양",
  [ANYANG_파스쿠찌]: "안양",
  //강남
  [GANGNAM_강남]: "강남",
  [GANGNAM_강남구청]: "강남",
  [GANGNAM_신논현]: "강남",
  [GANGNAM_논현]: "강남",
  [GANGNAM_교대]: "강남",
  [GANGNAM_양재]: "강남",
  [GANGNAM_선릉]: "강남",
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
    id: SUWAN_투썸상현,
    location: "경기 용인시 수지구 광교중앙로 310",
    time: "08:00 - 24:00",
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
  {
    id: SUWAN_이디야,
    location: "경기 수원시 권선구 구운중로4번길 20",
    time: "10:30 - 21:00",
  },
  {
    id: SUWAN_스타벅스,
    location: "경기 수원시 영통구 대학로 47 광교스타인",
    time: "07:30 - 21:00",
  },
  //양천
  {
    id: YANG_위카페,
    location: "서울특별시 강서구 등촌동 648-5 1층",
    time: "08:00 - 21:00",
  },
  {
    id: YANG_할리스,
    location: "서울특별시 영등포구 당산제2동 당산로 219",
    time: "08:00 - 01:00",
  },
  {
    id: YANG_파스쿠찌,
    location: "서울특별시 강서구 화곡동 897-14",
    time: "08:00 - 00:00",
  },
  {
    id: YANG_이디야,
    location: "서울 양천구 신목로 102 대경프라자",
    time: "07:30 - 23:30",
  },
  {
    id: YANG_카페베네,
    location: "서울 영등포구 당산로 138",
    time: "08:00 - 22:00",
  },
  {
    id: YANG_스타벅스,
    location: "서울 강서구 등촌로 57",
    time: "07:30 - 22:00",
  },

  //안양
  {
    id: ANYANG_파스쿠찌,
    location: "경기 안양시 만안구 안양로304번길 12",
    time: "09:30 - 23:00",
  },
  {
    id: ANYANG_숨맑은집,
    location: "경기 안양시 동안구 평촌대로223번길 44",
    time: "09:00 - 24:00",
  },
  {
    id: ANYANG_인뎃커피,
    location: "경기 안양시 동안구 흥안대로 530",
    time: "09:00 - 24:00",
  },
  {
    id: ANYANG_커피인더스트리,
    location: "경기 군포시 군포로 731",
    time: "09:00 - 24:00",
  },

  //강남
  {
    id: GANGNAM_강남,
    location: "서울 강남구 강남대로 402",
    time: "07:30 - 24:00",
  },
  {
    id: GANGNAM_강남구청,
    location: "서울 강남구 선릉로131길 12",
    time: "07:30 - 23:00",
  },
  {
    id: GANGNAM_교대,
    location: "서울 서초구 서초중앙로 119",
    time: "08:00 - 05:00",
  },
  {
    id: GANGNAM_논현,
    location: "서울 서초구 신반포로47길 5",
    time: "07:00 - 22:00",
  },
  {
    id: GANGNAM_선릉,
    location: "서울 강남구 선릉로 433 세방빌딩",
    time: "07:00 - 22:00",
  },
  {
    id: GANGNAM_신논현,
    location: "서울 강남구 강남대로112길 20",
    time: "07:00 - 21:00",
  },
  {
    id: GANGNAM_양재,
    location: "서울 서초구 강남대로 210 행복빌딩",
    time: "08:00 - 23:00",
  },
];
