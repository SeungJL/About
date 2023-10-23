import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function NoMemberPopUp({ setIsModal }: IModal) {
  return (
    <ModalLayout size="md" onClose={() => setIsModal(false)}>
      <ModalHeader text="가입 오류" />
      <ModalBody>
        <ModalSubtitle>
          웹 사이트 오류로 가입 승인이 되지 않은 멤버입니다. 동아리 단톡방도
          존재하니 활동을 위해서는 반드시 갠톡주세요!
        </ModalSubtitle>
        <Number>
          <span>010-6230-0206 (이승주)</span>
        </Number>
      </ModalBody>
      <ModalFooterOne
        text="확인"
        isFull={true}
        onClick={() => setIsModal(false)}
      />
    </ModalLayout>
  );
}

const Number = styled.div`
  > span:first-child {
    margin-right: var(--margin-md);
  }
`;

export default NoMemberPopUp;
