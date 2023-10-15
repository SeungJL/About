import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLeyou } from "../../components/modals/Modals";
import {
  ModalFooterNav,
  ModalMain,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function ServerInspectModal({ setIsModal }: IModal) {
  return (
    <>
      <ModalLeyou size="md">
        <ModalHeaderX title="점검중" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>임시적으로 비활성화 된 컨텐츠 입니다.</ModalSubtitle>
          <div>
            해당 컨텐츠는 현재 점검중에 있습니다. 빠른 시간내로 다시 이용할 수
            있게 조치할게요!
          </div>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>확인</button>
        </ModalFooterNav>
      </ModalLeyou>
    </>
  );
}

export default ServerInspectModal;
