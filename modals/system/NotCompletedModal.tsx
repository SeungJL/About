import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function NotCompletedModal({ setIsModal }: IModal) {
  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="md">
        <ModalHeader text="미완성 컨텐츠" />
        <ModalBody>
          <ModalSubtitle>
            개발이 완료되지 않은 기능입니다.
            <br />
            <span>조금만 더 기다려주세요!</span>
          </ModalSubtitle>
        </ModalBody>
        <ModalFooterOne text="닫기" onClick={() => setIsModal(false)} />
      </ModalLayout>
    </>
  );
}

export default NotCompletedModal;
