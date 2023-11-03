import styled from "styled-components";
import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { IModal } from "../../types/reactTypes";

function AlphabetPopUp({ setIsModal }: IModal) {
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="알파벳 컬렉션" />
      <ModalBody>
        <AlphabetContainer>
          <AlphabetIcon alphabet="A" />
          <AlphabetIcon alphabet="B" />
          <AlphabetIcon alphabet="O" />
          <AlphabetIcon alphabet="U" />
          <AlphabetIcon alphabet="T" />
        </AlphabetContainer>
        <Content>
          출석체크를 통해 알파벳을 수집하고, 모두 모아 상품을 획득해봐요! 해당
          컨텐츠는 마이페이지에서 확인할 수 있습니다.
        </Content>
      </ModalBody>
      <ModalFooterOne onClick={() => setIsModal(false)} />
    </ModalLayout>
  );
}

const AlphabetContainer = styled.div`
  display: flex;
  margin-top: var(--margin-min);
  margin-bottom: var(--margin-max);
  font-size: 16px;
  align-items: center;
  > * {
    margin-right: var(--margin-min);
  }
`;

const Content = styled.div`
  font-size: 12px;
  color: var(--font-h2);
  font-weight: 600;
`;

export default AlphabetPopUp;
