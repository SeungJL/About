import { SetStateAction } from "react";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/layouts/Modals";
import {
  ModalFooterNav,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";

interface INotCompletedModal2 {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function NotCompletedModal2({ setIsModal }: INotCompletedModal2) {
  const onClickClosed = () => {
    setIsModal(false);
  };
  return (
    <>
      <Layout>
        <ModalHeaderXLine title="미완성 컨텐츠" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>완전히 완성되지 않은 컨텐츠 입니다.</ModalSubtitle>
          <div>
            이후에 나올 컨텐츠들을 미리 볼 수 있도록 공개로 설정을 해두었습니다.
            이것저것 해보셔도 상관없습니다!
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
