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
import { GroupStudyCategory } from "../../types/page/groupStudy";
import { TABLE_COLORS } from "../styles";

export const GROUP_STUDY_CATEGORY_ARR: GroupStudyCategory[] = [
  "어학",
  "프로그래밍",
  "자격증",
  "취업준비",
  "자기계발",
  "게임",
  "친목",
  "운동",
  "기타",
];

export const GROUP_STUDY_SUB_CATEGORY = {
  어학: ["토익", "오픽", "회화"],
  자격증: ["컴활", "한국사", "정보처리기사"],
  프로그래밍: ["코딩테스트", "프로젝트", "프로그래밍 공부"],
  취업준비: ["공기업 면접", "사기업 면접", "인적성(NCS)"],
  자기계발: ["투두메이트", "블로그", "다이어리", "열품타", "공부인증", "습관"],
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
