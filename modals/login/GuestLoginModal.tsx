import styled from "styled-components";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

interface IGuestLoginModal extends IModal {
  customSignin: (type: "member" | "guest") => void;
}

function GuestLoginModal({ setIsModal, customSignin }: IGuestLoginModal) {
  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderX title="게스트 로그인" setIsModal={setIsModal} />
        <ModalMain>
          이 기능은 동아리 외부인을 위한 기능으로, 완성되지 않은 기능들이
          있습니다.
          <b>
            해당 동아리 소속의 인원은 카카오 로그인을 이용해주시기 바랍니다.
          </b>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>뒤로</button>
          <button onClick={() => customSignin("guest")}>로그인</button>
        </ModalFooterNav>
      </ModalLayout>
    </>
  );
}

const Layout = styled.div``;

export default GuestLoginModal;
