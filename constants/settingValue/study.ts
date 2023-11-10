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
  SUWAN_경기대,
  SUWAN_경희대,
  SUWAN_고색역,
  SUWAN_광교엘리웨이,
  SUWAN_광교중앙역,
  SUWAN_구운동,
  SUWAN_망포역,
  SUWAN_상현역,
  SUWAN_성균관대역,
  SUWAN_송죽,
  SUWAN_수원시청,
  SUWAN_수원역,
  SUWAN_아주대,
  SUWAN_자유신청,
  SUWAN_행궁동,
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
export const STUDY_VOTE_START_HOUR = 16;
export const VOTER_DATE_END = 18;
export const STUDY_VOTE_END_HOUR = 23;

export const STUDY_START_VOTETIME_HOUR = 10;
export const STUDY_TIME_TABLE = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];

export const STUDY_SPACE_ORDER = {
  [SUWAN_수원역]: 0,
  [SUWAN_경희대]: 1,
  [SUWAN_수원시청]: 2,
  [SUWAN_아주대]: 3,
  [SUWAN_경기대]: 4,
  [SUWAN_송죽]: 5,
  [SUWAN_구운동]: 6,
  [SUWAN_상현역]: 7,
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

export const STUDY_VOTE_ICON = {
  default: `<div style="display:flex; justify-content:center; align-items:center; color:white; font-weight:800;  width: 25px; height: 25px; border-radius: 50%; background: linear-gradient(to right, rgba(3, 224, 154, 0.4), rgba(1, 175, 237, 0.4));">
  <button style="width: 100%; height: 100%; border: none; background: transparent;"></button>
  </div>`,
  main: `<div style="display:flex; justify-content:center; align-items:center; color:white; font-weight:800;font-size:15px;  width: 25px; height: 25px; border-radius: 50%; background: linear-gradient(to right, rgba(3, 224, 154, 1), rgba(1, 175, 237, 1));">
  <button style="width: 100%; height: 100%; border: none; background: transparent;">A</button>
  </div>`,
  sub: `<div style="display:flex; justify-content:center; align-items:center; color:white; font-weight:800;  font-size:15px; width: 25px; height: 25px; border-radius: 50%; background: linear-gradient(to right, rgba(3, 224, 154, 0.7), rgba(1, 175, 237, 0.7));">
  <button style="width: 100%; height: 100%; border: none; background: transparent;">B</button>
  </div>`,
};

//15 //25
export const STUDY_DISTANCE = {
  1: [
    [SUWAN_수원시청, SUWAN_수원역],
    [SUWAN_수원시청, SUWAN_망포역],
    [SUWAN_수원시청, SUWAN_아주대],
    [SUWAN_수원시청, SUWAN_고색역],
    [SUWAN_수원역, SUWAN_고색역],
    [SUWAN_수원역, SUWAN_성균관대역],
    [SUWAN_수원역, SUWAN_행궁동],
    [SUWAN_수원역, SUWAN_구운동],
    [SUWAN_수원역, SUWAN_망포역],
    [SUWAN_경희대, SUWAN_망포역],
    [SUWAN_아주대, SUWAN_경기대],
    [SUWAN_아주대, SUWAN_광교중앙역],
    [SUWAN_아주대, SUWAN_광교엘리웨이],
    [SUWAN_아주대, SUWAN_행궁동],
    [SUWAN_아주대, SUWAN_상현역],
    [SUWAN_경기대, SUWAN_광교중앙역],
    [SUWAN_경기대, SUWAN_행궁동],
    [SUWAN_경기대, SUWAN_상현역],
    [SUWAN_구운동, SUWAN_고색역],
    [SUWAN_구운동, SUWAN_성균관대역],
    [SUWAN_상현역, SUWAN_광교중앙역],
    [SUWAN_상현역, SUWAN_경기대],
    [SUWAN_상현역, SUWAN_광교엘리웨이],
    [SUWAN_고색역, SUWAN_성균관대역],
    [SUWAN_고색역, SUWAN_망포역],
    [SUWAN_광교엘리웨이, SUWAN_광교중앙역],
    [SUWAN_송죽, SUWAN_행궁동],
    [SUWAN_송죽, SUWAN_성균관대역],
  ],
  2: [
    [SUWAN_수원시청, SUWAN_행궁동],
    [SUWAN_수원시청, SUWAN_경희대],
    [SUWAN_수원시청, SUWAN_광교엘리웨이],
    [SUWAN_수원시청, SUWAN_광교중앙역],
    [SUWAN_아주대, SUWAN_수원역],
    [SUWAN_아주대, SUWAN_송죽],
    [SUWAN_수원역, SUWAN_송죽],
    [SUWAN_성균관대역, SUWAN_행궁동],
    [SUWAN_고색역, SUWAN_행궁동],
    [SUWAN_망포역, SUWAN_광교엘리웨이],
    [SUWAN_경희대, SUWAN_광교엘리웨이],
    [SUWAN_광교엘리웨이, SUWAN_경기대],
    [SUWAN_구운동, SUWAN_행궁동],
    [SUWAN_구운동, SUWAN_수원시청],
    [SUWAN_구운동, SUWAN_송죽],
    [SUWAN_행궁동, SUWAN_광교중앙역],
    [SUWAN_상현역, SUWAN_행궁동],
  ],
};
