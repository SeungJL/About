import styled from "styled-components";
import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";
import {
  IFooterOptions,
  IHeaderOptions,
  ModalLayout,
} from "../../components/modals/Modals";
import { IModal } from "../../types/reactTypes";
import { Alphabet } from "../../types/user/collections";

interface IAlphabetModal extends IModal {
  alphabet: Alphabet;
}

function AlphabetModal({ alphabet, setIsModal }: IAlphabetModal) {
  if (!alphabet) return;

  const footerOptions: IFooterOptions = {
    main: {},
  };

  const headerOptions: IHeaderOptions = {};

  return (
    <ModalLayout
      title="알파벳을 획득했어요!"
      footerOptions={footerOptions}
      headerOptions={headerOptions}
      setIsModal={setIsModal}
    >
      <Container>
        <AlphabetIcon alphabet={alphabet} isBeat={true} />
      </Container>
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
