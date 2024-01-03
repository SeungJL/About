import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { IModal } from "../../types/reactTypes";
import { IConfirmContent } from "./ConfirmModal";

interface IConfirmModal extends IModal {
  content: IConfirmContent;
}

function ConfirmModal2({ content, setIsModal }: IConfirmModal) {
  return (
    <ModalLayout size="md" onClose={() => setIsModal(false)}>
      <ModalHeader text={content.title} />
      <ModalBody>{content.text}</ModalBody>
      <ModalFooterTwo
        leftText="취소"
        onClickLeft={() => setIsModal(false)}
        rightText="확인"
        onClickRight={content.onClickRight}
      />
    </ModalLayout>
  );
}

export default ConfirmModal2;
