import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { isProfileEditState } from "../../../recoil/previousAtoms";
import { isGuestState, userInfoState } from "../../../recoil/userAtoms";
import { DispatchString } from "../../../types/reactTypes";
import { UserOverviewModal } from "./UserNavigation";

interface IUserNavigationBlock {
  setModalOpen: DispatchString;
}

type ContentByType<T extends "page" | "modal"> = T extends "page"
  ? string
  : UserOverviewModal;

function UserNavigationBlock({ setModalOpen }: IUserNavigationBlock) {
  const router = useRouter();
  const failToast = useFailToast();

  const isGuest = useRecoilValue(isGuestState);

  const userInfo = useRecoilValue(userInfoState);
  const role = userInfo?.role;
  const isAdmin = role === "previliged" || role === "manager";

  //네비게이션 함수
  const onClickBlock = <T extends "page" | "modal">(
    type: T,
    content: ContentByType<T>
  ): void => {
    if (isGuest && (content as UserOverviewModal) !== "logout") {
      failToast("guest");
      return;
    }

    if (type === "page") {
    
      router.push(content);
    }
    if (type === "modal") {
      if ((content as UserOverviewModal) === "levelUp") {
        if (role !== "human") {
          failToast("free", "신청가능한 등급이 없습니다.");
          return;
        }
      }
      setModalOpen(content);
    }
  };

  return (
    <>
      <Layout>
        {isAdmin && (
          <div>
            <BlockName>관리자</BlockName>
            <NavBlock>
              <button onClick={() => onClickBlock("page", "/admin")}>
                관리자 페이지
              </button>
            </NavBlock>
          </div>
        )}
        <div>
          <BlockName>신청</BlockName>
          <NavBlock>
            <button onClick={() => onClickBlock("modal", "suggest")}>
              건의하기
            </button>
            <button onClick={() => onClickBlock("modal", "declaration")}>
              불편사항 신고
            </button>
            <button onClick={() => onClickBlock("modal", "studyPlace")}>
              스터디 장소 추가 요청
            </button>
            <button onClick={() => onClickBlock("modal", "rest")}>
              휴식 신청 / 취소
            </button>
            <button onClick={() => onClickBlock("modal", "levelUp")}>
              등업 신청
            </button>
          </NavBlock>
        </div>
        <div>
          <BlockName>기타 세팅</BlockName>
          <NavBlock>
         
            <button onClick={() => onClickBlock("modal", "spaceSetting")}>
              스터디 프리셋 설정
            </button>
            <button onClick={() => onClickBlock("modal", "birthday")}>
              생일 공개 설정
            </button>
            <button onClick={() => onClickBlock("modal", "deposit")}>
              보증금 충전
            </button>
            <button onClick={() => onClickBlock("modal", "logout")}>
              로그아웃
            </button>
          </NavBlock>
        </div>
        <div>
          <BlockName>안내</BlockName>
          <NavBlock>
            <button onClick={() => onClickBlock("page", `/faq`)}>
              자주 묻는 질문
            </button>
            <button onClick={() => onClickBlock("page", `user/info/policy`)}>
              서비스 이용 약관
            </button>
            <button onClick={() => onClickBlock("page", `user/info/privacy`)}>
              개인정보 처리방침
            </button>
            <button onClick={() => onClickBlock("page", `user/info/avatar`)}>
              아바타 아이콘 저작권
            </button>
            <button onClick={() => onClickBlock("modal", "secede")}>
              회원 탈퇴
            </button>
          </NavBlock>
        </div>
        <div>
          <BlockName />
        </div>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border: var(--border-main-light);
  border-radius: var(--border-radius-sub);
  margin: var(--margin-max) 0;
`;

const BlockName = styled.div`
  padding: var(--padding-min) 0;
  background-color: var(--font-h56);
  font-weight: 600;
  font-size: 12px;
  display: flex;
  color: var(--font-h2);
  padding-left: var(--padding-md);
`;

const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--font-h8);
  > button {
    padding: var(--padding-sub) 0;
    padding-left: var(--padding-md);
    text-align: start;
    font-size: 13px;
    border-bottom: var(--border-main-light);
  }
`;

export default UserNavigationBlock;
