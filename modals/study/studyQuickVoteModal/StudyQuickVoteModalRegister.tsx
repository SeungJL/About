import { useState } from "react";
import { useRecoilValue } from "recoil";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import ModalPortal from "../../../components/common/ModalPortal";
import { userLocationState } from "../../../recoil/userAtoms";
import {
  ModalFooterNav,
  ModalMain,
  ModalSubtitle,
} from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import RequestStudyPreferenceModal from "../../userRequest/RequestStudyPreferenceModal";

function StudyQuickVoteModalRegister({ setIsModal }: IModal) {
  const [isPreference, setIsPreference] = useState(false);
  const location = useRecoilValue(userLocationState);
  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderX title="스터디 빠른 투표" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>
            등록된 스터디 선호 장소가 없어요. 3초만 투자하시면 다음부터는
            원터치로 원하는 장소에 투표할 수 있어요!
          </ModalSubtitle>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>닫기</button>
          <button onClick={() => setIsPreference(true)}>등록하기</button>
        </ModalFooterNav>
      </ModalLayout>
      {isPreference && (
        <ModalPortal setIsModal={setIsPreference}>
          <RequestStudyPreferenceModal
            setIsModal={setIsModal}
            isBig={location !== "안양"}
          />
        </ModalPortal>
      )}
    </>
  );
}

export default StudyQuickVoteModalRegister;
