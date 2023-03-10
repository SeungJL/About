import styled from "styled-components";
import { useState } from "react";

import ProfileFormModal from "../../modals/user/ModifyUserInfoModal";
import ModalPortal from "../ModalPortal";
import SuggestModal from "../../modals/write/SuggestModal";

export default function UserNavigation() {
  const [isShowProfileModal, setIsShowProfileModal] = useState(false);
  const [isShowSuggest, setIsShowSuggest] = useState(false);
  return (
    <>
      <Layout>
        <ButtonNav>
          <Button onClick={() => setIsShowProfileModal(true)}>
            프로필 수정
          </Button>
          <Button onClick={() => setIsShowSuggest(true)}>건의하기</Button>
          <Button>받은 요청</Button>
          <Button>기타 설정</Button>
        </ButtonNav>
      </Layout>
      {isShowProfileModal && (
        <ModalPortal closePortal={setIsShowProfileModal}>
          <ProfileFormModal setIsShowProfileModal={setIsShowProfileModal} />
        </ModalPortal>
      )}
      {isShowSuggest && (
        <ModalPortal closePortal={setIsShowSuggest}>
          <SuggestModal setIsShowSuggest={setIsShowSuggest} />
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
