import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function NotCompletedModal2({ setIsModal }: IModal) {
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="미완성 컨텐츠" />
      <ModalBody>
        <ModalSubtitle>완전히 완성되지 않은 컨텐츠 입니다.</ModalSubtitle>
        <div>
          이후에 나올 컨텐츠들을 미리 볼 수 있도록 공개로 설정을 해두었습니다.
          이것저것 해보셔도 상관없습니다!
        </div>
      </ModalBody>
      <ModalFooterOne
        text="확인"
        onClick={() => setIsModal(false)}
        isFull={true}
      />
    </ModalLayout>
  );
}

export default NotCompletedModal2;
