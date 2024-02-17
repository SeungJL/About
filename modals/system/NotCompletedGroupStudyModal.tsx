import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function NotCompletedGroupModal({ setIsModal }: IModal) {
  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="lg">
        <ModalHeader text="오픈 예정 컨텐츠" />
        <ModalBody>
          <ModalSubtitle>
            소모임은 12월 말에 오픈 예정인 컨텐츠입니다. 스터디 뿐만 아니라
            다양한 장르의 그룹화를 진행할 수 있도록 계획하고 있습니다. 아직
            완성되지 않았으니 보기만 해주시고, 허락받은 경우가 아니면 소모임
            개설이나 가입 신청은 아직 하지 말아주세요 ㅎㅎ,, 최종 완료만 아니면
            테스트 해보는 건 상관없습니다.
          </ModalSubtitle>
        </ModalBody>
        <ModalFooterOne onClick={() => setIsModal(false)} />
      </ModalLayout>
    </>
  );
}

export default NotCompletedGroupModal;
