import styled from "styled-components";
import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeaderCenter,
  ModalLayout,
} from "../../components/modals/Modals";
import { IModal } from "../../types/reactTypes";
import { Alphabet } from "../../types/user/collections";

interface IAlphabetModal extends IModal {
  alphabet: Alphabet;
}

function AlphabetModal({ alphabet, setIsModal }: IAlphabetModal) {
  if (!alphabet) return;
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeaderCenter text="알파벳을 획득했어요!" />
      <ModalBody>
        <Container>
          <AlphabetIcon alphabet={alphabet} isBeat={true} />
        </Container>
      </ModalBody>
      <ModalFooterOne onClick={() => setIsModal(false)} isFull={true} />
    </ModalLayout>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  height: 100%;
`;

export default AlphabetModal;
