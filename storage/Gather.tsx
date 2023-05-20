import {
  faAtom,
  faCoffee,
  faExplosion,
  faPaperPlane,
  faPersonRunning,
  faShuttleSpace,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GATHER_CATEGORY = [
  { title: "취미", subtitle: "보드게임·방탈출·볼링" },
  { title: "맛집·카페", subtitle: "맛집투어·카페·디저트" },
  { title: "운동", subtitle: "러닝·산책·등산·클라이밍·헬스" },
  { title: "힐링", subtitle: "피크닉·캠핑·드라이브" },
  { title: "문화·예술", subtitle: "영화·전시·공연·연극·뮤지컬" },
  { title: "정기모임", subtitle: "정기모임" },
  { title: "기타", subtitle: "" },
];

export const GatherCategoryIcons = [
  <FontAwesomeIcon icon={faUserAstronaut} key="1" color="#FF8896" />,
  <FontAwesomeIcon icon={faCoffee} key="2" color="#FEBC5A" />,
  <FontAwesomeIcon icon={faPersonRunning} key="3" color="#71C3FF" />,
  <FontAwesomeIcon icon={faShuttleSpace} key="4" color="#9E7CFF" />,
  <FontAwesomeIcon icon={faPaperPlane} key="5" color="var(--color-mint)" />,
  <FontAwesomeIcon icon={faExplosion} key="6" color="black" />,
  <FontAwesomeIcon icon={faAtom} key="7" color="#A6ABBF" />,
];
