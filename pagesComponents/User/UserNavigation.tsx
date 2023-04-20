import styled from "styled-components";
import { useState } from "react";

import SuggestModal from "../../modals/user/SuggestModal";
import { useSession } from "next-auth/react";
import ModalPortal from "../../components/ModalPortal";
import ProfileModifyModal from "../../modals/user/ModifyProfileModal";

export default function UserNavigation() {
  const [isShowProfileModal, setIsShowProfileModal] = useState(false);
  const [isShowSuggest, setIsShowSuggest] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <Layout>
        <ButtonNav>
          <Button onClick={() => setIsShowProfileModal(true)}>
            프로필 수정
          </Button>
          <Button onClick={() => setIsShowSuggest(true)}>건의하기</Button>
          {<Button>휴식 신청</Button>}
          <Button>기타 설정</Button>
        </ButtonNav>
      </Layout>
      {isShowProfileModal && (
        <ModalPortal setIsModal={setIsShowProfileModal}>
          <ProfileModifyModal setIsModal={setIsShowProfileModal} />
        </ModalPortal>
      )}
      {isShowSuggest && (
        <ModalPortal setIsModal={setIsShowSuggest}>
          <SuggestModal setIsModal={setIsShowSuggest} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 15vh;

  display: flex;
  align-items: center;
`;

const ButtonNav = styled.nav`
  width: 100%;
  height: 80%;
  display: grid;

  grid-template: 1fr 1fr/1fr 1fr;

  > button:nth-child(2n-1) {
    border-right: 1px solid rgb(0, 0, 0, 0.3);
  }
  > button:first-child,
  button:nth-child(2) {
    border-bottom: 1px solid rgb(0, 0, 0, 0.3);
  }
`;

const Button = styled.button`
  padding: 5px;
`;
