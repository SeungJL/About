import { faLightbulbOn } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import ModalPortal from "../../components/modals/ModalPortal";
import { ModalLayout } from "../../components/modals/Modals";
import {
  ModalFooterNav,
  ModalMain,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import RequestSuggestModal from "../userRequest/RequestSuggestModal";

function FreeStudySpacePopUp({ setIsModal }: IModal) {
  const [isSuggestModal, setIsSuggestModal] = useState(false);
  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderX title="스터디 장소 추천" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>
            스터디가 열리지 않은 당일이라도 개인이 편한 곳에 오픈해서 공부할 수
            있는 FREE 오픈 전용 스터디 장소가 추가됩니다. 이를 위해 신규 장소
            추천을 받습니다.
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
          <button onClick={() => setIsSuggestModal(true)}>장소 추천</button>
        </ModalFooterNav>
      </ModalLayout>
      {isSuggestModal && (
        <ModalPortal setIsModal={setIsModal}>
          <RequestSuggestModal setIsModal={setIsModal} type="studySpace" />
        </ModalPortal>
      )}
    </>
  );
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FreeStudySpacePopUp;
