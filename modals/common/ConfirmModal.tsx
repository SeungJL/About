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
        mt="var(--margin-min)"
        fontWeight={400}
        fontSize={15}
        p="var(--padding-sub) var(--padding-main)"
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
