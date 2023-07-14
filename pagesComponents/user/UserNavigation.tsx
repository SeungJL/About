import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useFailToast } from "../../hooks/ui/CustomToast";
import { isProfileEditState } from "../../recoil/previousAtoms";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ModalPortal from "../../components/ModalPortal";
import {
  useUserLocationQuery,
  useUserRoleQuery
} from "../../hooks/user/queries";
import RequestChargeDepositModal from "../../modals/userRequest/RequestChargeDepositModal";
import RequestPromotionRewardModal from "../../modals/userRequest/RequestPromotionRewardModal";
import RequestRestModal from "../../modals/userRequest/RequestRestModal/RequestRestModal";
import RequestSecedeModal from "../../modals/userRequest/RequestSecedeModal";
import SettingStudySpace from "../../modals/userRequest/RequestStudyPreferenceModal";
import RequestSuggestModal from "../../modals/userRequest/RequestSuggestModal";

function UserNavigation() {
  const { data: session } = useSession();
  const isGuest = session?.user?.name === "guest";

  const failToast = useFailToast();
  const setIsProfileEditState = useSetRecoilState(isProfileEditState);
  const [modalOpen, setModalOpen] = useState("");

  const { data: location } = useUserLocationQuery();

  const { data: role } = useUserRoleQuery();
  const isAdmin = session?.role === "previliged";

  const router = useRouter();
  const onClickProfileEdit = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    setIsProfileEditState(true);
    router.push(`/register/location`);
  };

  const onClickItem = (type: string) => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    setModalOpen(type);
  };
  const cancelRef = useRef();

  const handleOutput = (isOpen) => {
    if (!isOpen) {
      setModalOpen("");
    }
  };
  console.log(role);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Layout>
        {role === "previliged" && (
          <div>
            <BlockName>관리자</BlockName>
            <NavBlock>
              <button onClick={() => router.push(`/admin`)}>
                관리자 페이지
              </button>
            </NavBlock>
          </div>
        )}
        <div>
          <BlockName>신청</BlockName>
          <NavBlock>
            <button onClick={() => onClickItem("suggest")}>건의하기</button>
            <button onClick={() => onClickItem("declaration")}>
              불편사항 신고
            </button>
            <button onClick={() => onClickItem("promotion")}>
              홍보 리워드 신청
            </button>
            <button onClick={() => onClickItem("rest")}>휴식 신청</button>
          </NavBlock>
        </div>
        <div>
          <BlockName>정보 변경</BlockName>
          <NavBlock>
            <button onClick={onClickProfileEdit}>프로필 수정</button>
            <button onClick={() => onClickItem("spaceSetting")}>
              스터디 선호 장소 설정
            </button>
            <button onClick={() => onClickItem("deposit")}>보증금 충전</button>
            <button onClick={onOpen}>로그아웃</button>
          </NavBlock>
        </div>
        <div>
          <BlockName>안내</BlockName>
          <NavBlock>
            <button onClick={() => router.push(`user/info/scoreSystem`)}>
              자주 묻는 질문
            </button>
            <button onClick={() => router.push(`user/info/policy`)}>
              서비스 이용 약관
            </button>
            <button onClick={() => router.push(`user/info/privacy`)}>
              개인정보 처리방침
            </button>
            <button onClick={() => router.push(`user/info/avatar`)}>
              아바타 아이콘 저작권
            </button>
            <button onClick={() => onClickItem("secede")}>회원 탈퇴</button>
          </NavBlock>
        </div>
        <div>
          <BlockName />
        </div>
      </Layout>
      {modalOpen === "suggest" && (
        <ModalPortal setIsModal={handleOutput}>
          <RequestSuggestModal type="suggest" setIsModal={handleOutput} />
        </ModalPortal>
      )}

      {modalOpen === "rest" && (
        <ModalPortal setIsModal={handleOutput}>
          <RequestRestModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "declaration" && (
        <ModalPortal setIsModal={handleOutput}>
          <RequestSuggestModal type="declare" setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "deposit" && (
        <ModalPortal setIsModal={handleOutput}>
          <RequestChargeDepositModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "promotion" && (
        <ModalPortal setIsModal={handleOutput}>
          <RequestPromotionRewardModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "secede" && (
        <ModalPortal setIsModal={handleOutput}>
          <RequestSecedeModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "spaceSetting" && (
        <ModalPortal setIsModal={handleOutput}>
          <SettingStudySpace
            isBig={Boolean(location === "수원")}
            setIsModal={handleOutput}
          />
        </ModalPortal>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent margin="auto 14px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              로그아웃
            </AlertDialogHeader>

            <AlertDialogBody>Bye Bye</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                color="white"
                backgroundColor="var(--color-mint)"
                onClick={() => signOut()}
                ml={3}
              >
                로그아웃
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--font-h5);
  border-radius: 6px;
  overflow: hidden;
  margin-top: 18px;
`;
const BlockName = styled.div`
  padding-bottom: 3px;
  background-color: var(--font-h6);
  font-weight: 600;
  font-size: 12px;
  height: 24px;
  display: flex;
  align-items: end;
  color: var(--font-h2);
  padding-left: 6px;
`;

const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--font-h8);
  padding-left: 6px;
  > button {
    text-align: start;
    height: 42px;
    font-size: 13px;
    border-bottom: 1.5px solid var(--font-h6);
  }
`;
export default UserNavigation;
