import { useState } from "react";
import ModalPortal from "../../../components/modals/ModalPortal";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import { ModalSubtitle } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import RequestStudyPreferenceModal from "../../userRequest/RequestStudyPreferenceModal";

function StudyQuickVoteRegisterModal({ setIsModal }: IModal) {
  const [isPreference, setIsPreference] = useState(false);

  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="sm">
        <ModalHeader text="스터디 빠른 투표" />
        <ModalBody>
          <ModalSubtitle>
            등록된 스터디 장소가 없습니다. 최초 1회 스터디 장소 등록이
            필요합니다.
          </ModalSubtitle>
        </ModalBody>
        <ModalFooterTwo
          leftText="닫기"
          rightText="등록하기"
          onClickLeft={() => setIsModal(false)}
          onClickRight={() => setIsPreference(true)}
        />
      </ModalLayout>
      {isPreference && (
        <ModalPortal setIsModal={setIsPreference}>
          <RequestStudyPreferenceModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

export default StudyQuickVoteRegisterModal;
