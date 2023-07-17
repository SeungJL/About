import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import {
  ModalFooterNav,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function NotCompletedModal2({ setIsModal }: IModal) {
  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderXLine title="미완성 컨텐츠" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>완전히 완성되지 않은 컨텐츠 입니다.</ModalSubtitle>
          <div>
            이후에 나올 컨텐츠들을 미리 볼 수 있도록 공개로 설정을 해두었습니다.
            이것저것 해보셔도 상관없습니다!
          </div>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>확인</button>
        </ModalFooterNav>
      </ModalLayout>
    </>
  );
}

const Layout = styled(ModalMd)``;

export default NotCompletedModal2;
