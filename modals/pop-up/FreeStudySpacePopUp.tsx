import { faLightbulbOn } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../components/modals/ModalPortal";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import RequestSuggestModal from "../userRequest/RequestSuggestModal";

function FreeStudySpacePopUp({ setIsModal }: IModal) {
  const [isSuggestModal, setIsSuggestModal] = useState(false);
  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="lg">
        <ModalHeader text="스터디 장소 추천" />
        <ModalBody>
          <ModalSubtitle>
            같이 카공하기 좋은 스터디 장소 추천을 받습니다! 혼자 알고 있는
            카페가 있다면 공유해주세요!{" "}
            <span style={{ color: "var(--color-mint)" }}>(+10 point)</span>
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
          rightText="장소 추천"
          onClickLeft={() => setIsModal(false)}
          onClickRight={() => setIsSuggestModal(true)}
        />
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
