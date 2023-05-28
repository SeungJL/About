import { useToast } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../components/ModalPortal";
import { ModalHeaderXLine } from "../../components/ui/Modal";
import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalLg,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";
import SuggestModal from "../user/SuggestModal";

function NotCompletedModal2({
  setIsModal,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const onClickClosed = () => {
    setIsModal(false);
  };
  return (
    <>
      <Layout>
        <ModalHeaderXLine title="미구현 컨텐츠" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>아직 서비스하지 않는 컨텐츠 입니다.</ModalSubtitle>
          <div>
            아직 완전히 개발되지 않았으나, 이후에 나올 컨텐츠들을 미리 볼 수
            있도록 공개로 설정을 해두었습니다. 이것저것 해보셔도 전혀
            상관없습니다.
          </div>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={onClickClosed}>확인</button>
        </ModalFooterNav>
      </Layout>
    </>
  );
}

const Layout = styled(ModalMd)``;

export default NotCompletedModal2;
