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
      <ModalLayout onClose={() => setIsModal(false)} size="sm">
        <ModalHeader text="미완성 컨텐츠" />
        <ModalBody>
          <ModalSubtitle>개발 진행중인 컨텐츠입니다.</ModalSubtitle>
        </ModalBody>
        <ModalFooterOne onClick={() => setIsModal(false)} />
      </ModalLayout>
    </>
  );
}

export default NotCompletedModal;
