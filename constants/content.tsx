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
import { IAccordionContent } from "../components/templates/Accordion";
import { TABLE_COLORS } from "./styles";

//신고 항목
export const DECLARE_LIST = [
  "개인 연락처 또는 만남 요구",
  " 종교 포교 목적 의심",
  "스터디 진행중 불편하게 만드는 언행",
  "모임 진행중 불편하게 만드는 언행",
  "기타",
];

//모임 카테고리
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
  <FontAwesomeIcon icon={faUserAstronaut} key="1" color={TABLE_COLORS[0]} />,
  <FontAwesomeIcon icon={faCoffee} key="2" color={TABLE_COLORS[1]} />,
  <FontAwesomeIcon
    icon={faChampagneGlasses}
    key="drink"
    color={TABLE_COLORS[2]}
  />,
  <FontAwesomeIcon icon={faPersonRunning} key="3" color={TABLE_COLORS[3]} />,
  <FontAwesomeIcon icon={faGamepad} key="7" color={TABLE_COLORS[8]} />,
  <FontAwesomeIcon icon={faShuttleSpace} key="4" color={TABLE_COLORS[4]} />,
  <FontAwesomeIcon icon={faPaperPlane} key="5" color={TABLE_COLORS[5]} />,
  <FontAwesomeIcon icon={faExplosion} key="6" color={TABLE_COLORS[6]} />,
  <FontAwesomeIcon icon={faAtom} key="8" color={TABLE_COLORS[7]} />,
];

//회원가입 질문 컨텐츠
export const ACCORDION_CONTENT_FEE: IAccordionContent[] = [
  {
    title: "저희 지역 스터디는 언제 오픈하나요?",
    content:
      " 신청 인원이 30명 정도 모이면 오픈합니다! 신청 현황은 가입 첫 페이지에서 언제든 확인할 수 있어요!",
  },
  {
    title: "신청 후에 어떻게 하나요?",
    content:
      "신청을 완료하시면 관리자가 확인하는대로 가입 승인과 단톡방 초대를 해 드립니다! 빠르면 당일이 될 수도 있고 늦어지면 최대 3~4일 정도 소요될 수 있습니다. 또한 마음이 바뀌어 참여를 안하게 되는 경우에도 가입 후 일주일 이내에는 가입비와 보증금 전액 환급해드립니다.",
  },
  {
    title: "스터디 벌금이 궁금해요!",
    content: [
      "1시간 이상 지각 -100원",
      "스터디 당일 불참 -200원",
      "스터디 당일 잠수 -1000원",
      "한 달에 1회 미만 참여 - 1000원",
      "가입한 달에는 참여 정산 벌금이 없습니다.",
      "보증금은 언제든 환급받을 수 있습니다.",
    ],
  },
  {
    title: "가입비와 벌금은 어디에 사용되나요?",
    content:
      "동아리 내에서는 다양한 이벤트와 컨텐츠를 항시 진행하고 있습니다. 동아리원 분들은 직접 이벤트에 침여할 수도 있고, 스터디에 참여하면 적립 받는 포인트를 사용해서 추첨 컨텐츠에 응모할 수도 있습니다. 모인 금액의 일부는 서비스 향상과 마케팅에도 사용됩니다.",
  },
  {
    title: "추가적으로 궁금한 내용이 있어요!",
    content: "",
  },
  {
    title: "가입 신청이 안돼요 ㅠㅠ",
    content: "",
  },
];
