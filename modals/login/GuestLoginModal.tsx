import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

interface IGuestLoginModal extends IModal {
  customSignin: (type: "member" | "guest") => void;
}

function GuestLoginModal({ setIsModal, customSignin }: IGuestLoginModal) {
  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="sm">
        <ModalHeader text="게스트 로그인" />
        <ModalBody>
          게스트용 로그인은 제한된 기능만을 제공합니다. 동아리 회원은 카카오
          로그인으로 접속해 주세요.
        </ModalBody>
        <ModalFooterOne
          isFull={true}
          text="로그인"
          onClick={() => customSignin("guest")}
        />
      </ModalLayout>
    </>
  );
}

const Main = styled(ModalMain)`
  line-height: 1.7;
  > span {
    margin-top: var(--margin-md);
    font-weight: 600;
  }
`;

const Footer = styled.div`
  display: flex;
`;

export default GuestLoginModal;
