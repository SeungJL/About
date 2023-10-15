import { faLightbulbOn } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import ModalPortal from "../../components/modals/ModalPortal";
import { ModalLeyou } from "../../components/modals/Modals";
import {
  ModalFooterNav,
  ModalMain,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import RequestSuggestModal from "../userRequest/RequestSuggestModal";

function SuggestPopUp({ setIsModal }: IModal) {
  const [isSuggestModal, setIsSuggestModal] = useState(false);
  return (
    <>
      <ModalLeyou size="md">
        <ModalHeaderX title="건의하기" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>
            여러분의 건의사항을 기다리고 있어요! 어떤 의견이든 좋습니다. 매번
            <B> + 20 POINT</B>의 리워드를 드려요!
          </ModalSubtitle>
          <Wrapper>
            <FontAwesomeIcon
              icon={faLightbulbOn}
              size="3x"
              color="var(--color-red)"
            />
          </Wrapper>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>닫기</button>
          <button onClick={() => setIsSuggestModal(true)}>건의하기</button>
        </ModalFooterNav>
      </ModalLeyou>
      {isSuggestModal && (
        <ModalPortal setIsModal={setIsModal}>
          <RequestSuggestModal setIsModal={setIsModal} type="suggest" />
        </ModalPortal>
      )}
    </>
  );
}

const B = styled.span`
  color: var(--color-mint);
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SuggestPopUp;
