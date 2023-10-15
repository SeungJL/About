import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLeyou } from "../../components/modals/Modals";
import {
  ModalFooterNav,
  ModalMain,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function NotCompletedModal2({ setIsModal }: IModal) {
  return (
    <>
      <ModalLeyou size="md">
        <ModalHeaderX title="미완성 컨텐츠" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>완전히 완성되지 않은 컨텐츠 입니다.</ModalSubtitle>
          <div>
            이후에 나올 컨텐츠들을 미리 볼 수 있도록 공개로 설정을 해두었습니다.
            이것저것 해보셔도 상관없습니다!
          </div>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>확인</button>
        </ModalFooterNav>
      </ModalLeyou>
    </>
  );
}

export default NotCompletedModal2;
