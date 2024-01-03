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
      <ModalLayout onClose={() => setIsModal(false)} size="md">
        <ModalHeader text="스터디 프리셋" />
        <ModalBody>
          <ModalSubtitle>
            설정해둔 스터디 프리셋이 없습니다. 프리셋은 최초 1회만 등록하면
            되고, 등록시 +20 point와 더불어 앞으로 빠른 투표가 가능합니다.
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
