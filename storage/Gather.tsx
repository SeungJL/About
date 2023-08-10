import {
  faAtom,
  faChampagneGlasses,
  faCoffee,
  faExplosion,
  faGamepad,
  faPaperPlane,
  faPersonRunning,
  faShuttleSpace,
  faUserAstronaut,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VOTE_TABLE_COLOR } from "../constants/system";

export const GATHER_CATEGORY = [
  { title: "취미", subtitle: "보드게임·방탈출·볼링" },
  { title: "맛집·카페", subtitle: "맛집투어·카페·디저트" },
  { title: "술 번개", subtitle: "only 저녁" },
  { title: "운동", subtitle: "러닝·산책·등산·클라이밍·헬스" },
  { title: "게임", subtitle: "PC · 모바일 · 콘솔" },
  { title: "문화·예술", subtitle: "영화·전시·공연·연극·뮤지컬" },
  { title: "힐링", subtitle: "피크닉·캠핑·드라이브" },
  { title: "정기모임", subtitle: "정기모임" },
  { title: "기타", subtitle: "" },
];

export const GatherCategoryIcons = [
  <FontAwesomeIcon
    icon={faUserAstronaut}
    key="1"
    color={VOTE_TABLE_COLOR[0]}
  />,
  <FontAwesomeIcon icon={faCoffee} key="2" color={VOTE_TABLE_COLOR[1]} />,
  <FontAwesomeIcon
    icon={faChampagneGlasses}
    key="drink"
    color={VOTE_TABLE_COLOR[2]}
  />,
  <FontAwesomeIcon
    icon={faPersonRunning}
    key="3"
    color={VOTE_TABLE_COLOR[3]}
  />,
  <FontAwesomeIcon icon={faGamepad} key="7" color={VOTE_TABLE_COLOR[8]} />,
  <FontAwesomeIcon icon={faShuttleSpace} key="4" color={VOTE_TABLE_COLOR[4]} />,
  <FontAwesomeIcon icon={faPaperPlane} key="5" color={VOTE_TABLE_COLOR[5]} />,
  <FontAwesomeIcon icon={faExplosion} key="6" color={VOTE_TABLE_COLOR[6]} />,
  <FontAwesomeIcon icon={faAtom} key="8" color={VOTE_TABLE_COLOR[7]} />,
];

export const GATHER_SHARE_IMAGES = [
  "https://user-images.githubusercontent.com/84257439/259632663-ffbad828-bee7-4869-a11a-bc1b9d583c8b.jpg",
  "https://user-images.githubusercontent.com/84257439/259634434-a7ab24c8-5739-46b6-8cf9-5a74d040b58f.jpg",
  "https://user-images.githubusercontent.com/84257439/259634428-18c509e3-a33c-4613-8fb6-7bb07bbf5017.jpg",
  "https://user-images.githubusercontent.com/84257439/259634421-b5258972-d3ab-4503-b9d1-1593908bd89d.jpg",
  "https://user-images.githubusercontent.com/84257439/259634436-06d6d159-da72-483a-beab-35801c064d15.jpg",
  "https://user-images.githubusercontent.com/84257439/259633062-57dce595-e49e-40f6-806c-da46e5ae4d12.jpg",
];
