import { SetStateAction } from "react";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/ui/Modal";
import {
  ModalFooterNav,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";

function InspectionModal({
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
        <ModalHeaderXLine title="점검중" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>임시적으로 비활성화 된 컨텐츠 입니다.</ModalSubtitle>
          <div>
            해당 컨텐츠는 현재 점검중에 있습니다. 빠른 시간내로 다시 이용할 수
            있게 조치할게요!
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

export default InspectionModal;
