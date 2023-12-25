import {
  faAtom,
  faBinary,
  faBookUser,
  faChampagneGlasses,
  faFileCertificate,
  faGamepad,
  faGlobe,
  faPersonRunning,
  faUserGraduate,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRuleModalContent } from "../../components/modals/RuleModal";
import { GroupStudyCategory } from "../../types/page/groupStudy";
import { TABLE_COLORS } from "../styles";

export const GROUP_STUDY_CATEGORY_ARR: GroupStudyCategory[] = [
  "어학",
  "프로그래밍",
  "자기계발",
  "자격증",
  "취업준비",
  "게임",
  "친목",
  "운동",
  "기타",
];

export const GROUP_STUDY_SUB_CATEGORY = {
  어학: ["토익", "오픽", "회화"],
  자격증: ["컴활", "한국사", "정보처리기사"],
  프로그래밍: ["코딩테스트", "프로젝트", "언어 공부"],
  취업준비: ["공기업 면접", "사기업 면접", "인적성(NCS)"],
  자기계발: ["투두메이트", "블로그", "다이어리", "공부인증/열품타", "습관"],
  게임: ["리그오브레전드", "오버워치", "롤토체스"],
  친목: ["방탈출", "보드게임"],
  운동: ["러닝", "운동 인증"],
  기타: ["편입준비", "공사"],
};

export const GROUP_STUDY_CATEGORY_ARR_ICONS = {
  어학: <FontAwesomeIcon icon={faGlobe} color={TABLE_COLORS[0]} />,
  자격증: <FontAwesomeIcon icon={faFileCertificate} color={TABLE_COLORS[1]} />,
  프로그래밍: <FontAwesomeIcon icon={faBinary} color={TABLE_COLORS[2]} />,
  취업준비: <FontAwesomeIcon icon={faUserGraduate} color={TABLE_COLORS[3]} />,
  자기계발: <FontAwesomeIcon icon={faBookUser} color={TABLE_COLORS[4]} />,
  게임: <FontAwesomeIcon icon={faGamepad} color={TABLE_COLORS[5]} />,
  친목: <FontAwesomeIcon icon={faChampagneGlasses} color={TABLE_COLORS[7]} />,
  운동: <FontAwesomeIcon icon={faPersonRunning} color={TABLE_COLORS[8]} />,
  기타: <FontAwesomeIcon icon={faAtom} color={TABLE_COLORS[6]} />,
};

export const GROUP_STUDY_RULE_CONTENT: IRuleModalContent = {
  headerContent: {
    title: "소모임 게시판",
    text: "다양한 주제의 스터디나 공통된 관심사 소모임을 개설하거나 참여할 수 있어요!",
  },
  mainContent: [
    {
      title: "소모임에 어떻게 참여할 수 있나요?",
      texts: [
        "누구나 소모임에 참여/개설 할 수 있으나 모집 마감, 승인이 필요한 경우, 조건이 존재하는 경우 등 제한될 수도 있습니다.",
        "추가로 원하는 카테고리는 건의사항으로 요청할 수 있습니다.",
      ],
    },
    {
      title: "소모임 활동은 어떻게 진행되나요?",
      texts: [
        "대부분은 단톡방에서 주로 진행됩니다. 웹사이트는 모임의 정보와 멤버 관리 및 홍보, 출석체크, 채팅, 모임등이 가능합니다.",
      ],
    },
    {
      title: "참여비/챌린지 관련",
      texts: [
        "기본 참여금으로 30 포인트(또는 200원)이 필요합니다. 모임에 따라 참여비가 요구되는 경우도 있고, 금액과 목적은 가입 신청시 공지되어 있습니다.",
        "인증이나 개인 위주로 진행되는 스터디의 경우 챌린지가 같이 진행되는 경우가 많습니다. 무조건 참여하는게 이득입니다 ㅎ",
      ],
    },
  ],
};
