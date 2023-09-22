import { Button } from "@chakra-ui/react";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function NotCompletedModal({ setIsModal }: IModal) {
  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderX title="미완성 컨텐츠" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>
            개발이 완료되지 않은 기능입니다.
            <br />
            <span>조금만 더 기다려주세요!</span>
          </ModalSubtitle>
        </ModalMain>
        <Button colorScheme="mintTheme" onClick={() => setIsModal(false)}>
          닫기
        </Button>
      </ModalLayout>
    </>
  );
}

export default NotCompletedModal;
