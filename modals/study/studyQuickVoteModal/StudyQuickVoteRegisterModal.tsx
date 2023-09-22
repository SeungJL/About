import { faRegistered } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/modals/ModalComponents";
import ModalPortal from "../../../components/modals/ModalPortal";
import { ModalLayout } from "../../../components/modals/Modals";
import {
  ModalFooterNav,
  ModalMain,
  ModalSubtitle,
} from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import RequestStudyPreferenceModal from "../../userRequest/RequestStudyPreferenceModal";

function StudyQuickVoteRegisterModal({ setIsModal }: IModal) {
  const [isPreference, setIsPreference] = useState(false);

  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderX title="스터디 빠른 투표" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>
            등록된 스터디 장소가 없어요. 3초만 투자하시면 다음부터는 원터치로
            원하는 장소에 투표할 수 있어요!
          </ModalSubtitle>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faRegistered}
              size="3x"
              color="var(--color-mint)"
            />
          </IconWrapper>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>닫기</button>
          <button onClick={() => setIsPreference(true)}>등록하기</button>
        </ModalFooterNav>
      </ModalLayout>
      {isPreference && (
        <ModalPortal setIsModal={setIsPreference}>
          <RequestStudyPreferenceModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default StudyQuickVoteRegisterModal;
