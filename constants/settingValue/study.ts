import {
  ANYANG_숨맑은집,
  ANYANG_인뎃커피,
  ANYANG_자유신청,
  ANYANG_커피인더스트리,
  ANYANG_파스쿠찌,
  GANGNAM_강남,
  GANGNAM_강남구청,
  GANGNAM_교대,
  GANGNAM_논현,
  GANGNAM_선릉,
  GANGNAM_신논현,
  GANGNAM_양재,
  GANGNAM_자유신청,
  SUWAN_이디야,
  SUWAN_자유신청,
  SUWAN_카탈로그,
  SUWAN_칸나,
  SUWAN_커피빈,
  SUWAN_탐앤탐스,
  SUWAN_탐앤탐스2,
  SUWAN_투썸,
  SUWAN_투썸상현,
  YANG_몽글,
  YANG_스타벅스,
  YANG_위카페,
  YANG_이디야,
  YANG_자유신청,
  YANG_카페꼼마,
  YANG_카페베네,
  YANG_파스쿠찌,
  YANG_할리스,
} from "../../storage/study";

//장소당 최대 인원
export const MAX_USER_PER_PLACE = 8;
//스터디 시간
export const STUDY_VOTE_START_HOUR = 14;
export const VOTER_DATE_END = 18;
export const STUDY_VOTE_END_HOUR = 23;

export const STUDY_START_VOTETIME_HOUR = 10;
export const STUDY_TIME_TABLE = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];

export const STUDY_SPACE_ORDER = {
  [SUWAN_탐앤탐스]: 0,
  [SUWAN_칸나]: 1,
  [SUWAN_투썸]: 2,
  [SUWAN_카탈로그]: 3,
  [SUWAN_탐앤탐스2]: 4,
  [SUWAN_커피빈]: 5,
  [SUWAN_이디야]: 6,
  [SUWAN_투썸상현]: 7,
  [SUWAN_자유신청]: 8,

  [YANG_위카페]: 0,
  [YANG_카페베네]: 1,
  [YANG_카페꼼마]: 2,
  [YANG_할리스]: 3,
  [YANG_스타벅스]: 4,
  [YANG_이디야]: 5,
  [YANG_파스쿠찌]: 6,
  [YANG_몽글]: 7,
  [YANG_자유신청]: 8,

  [ANYANG_숨맑은집]: 1,
  [ANYANG_인뎃커피]: 2,
  [ANYANG_파스쿠찌]: 3,
  [ANYANG_커피인더스트리]: 4,
  [ANYANG_자유신청]: 5,

  [GANGNAM_강남]: 0,
  [GANGNAM_논현]: 1,
  [GANGNAM_양재]: 2,
  [GANGNAM_선릉]: 3,
  [GANGNAM_강남구청]: 4,
  [GANGNAM_신논현]: 5,
  [GANGNAM_교대]: 6,
  [GANGNAM_자유신청]: 8,
};
