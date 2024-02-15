import { ModalHeader } from "@chakra-ui/react";
import { ModalFooterTwo, ModalLayout } from "../../components/modals/Modals";
import { IModal } from "../../types/reactTypes";

interface IConfirmModal extends IModal {
  content: IConfirmContent;
}

export interface IConfirmContent {
  title: string;
  text?: string;
  onClickRight: () => void;
}

function ConfirmModal({ content, setIsModal }: IConfirmModal) {
  return (
    <ModalLayout size="xs" onClose={() => setIsModal(false)}>
      <ModalHeader
        mt="var(--gap-1)"
        fontWeight={400}
        fontSize={15}
        p="var(--gap-3) var(--gap-4)"
      >
        {content.title}
      </ModalHeader>
      <ModalFooterTwo
        leftText="취소"
        onClickLeft={() => setIsModal(false)}
        rightText="확인"
        onClickRight={content.onClickRight}
      />
    </ModalLayout>
  );
}

export default ConfirmModal;
