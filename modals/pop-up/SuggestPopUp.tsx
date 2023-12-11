import { faLightbulbOn } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import RequestSuggestModal from "../userRequest/RequestSuggestModal";

function SuggestPopUp({ setIsModal }: IModal) {
  const [isSuggestModal, setIsSuggestModal] = useState(false);
  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="lg">
        <ModalHeader text="건의하기" />
        <ModalBody>
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
        </ModalBody>
        <ModalFooterTwo
          leftText="닫기"
          rightText="건의하기"
          onClickLeft={() => setIsModal(false)}
          onClickRight={() => setIsSuggestModal(true)}
        />
      </ModalLayout>
      {isSuggestModal && (
        <RequestSuggestModal setIsModal={setIsSuggestModal} type="suggest" />
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
  margin-bottom: var(--margin-main);
`;

export default SuggestPopUp;
