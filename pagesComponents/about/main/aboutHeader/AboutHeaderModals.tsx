import { useEffect, useState } from "react";
import ModalPortal from "../../../../components/common/ModalPortal";
import AttendCheckModal from "../../../../modals/aboutHeader/AttendCheckModal";
import AttendCheckWinModal from "../../../../modals/aboutHeader/AttendCheckWinModal";
import PromotionModal from "../../../../modals/aboutHeader/promotionModal/PromotionModal";
import RegularGatherResultModal from "../../../../modals/aboutHeader/RegularGatherResultModal";
import StudyRuleModal from "../../../../modals/aboutHeader/studyRuleModal/StudyRuleModal";
import { AboutHeaderIconType } from "./AboutHeader";

interface IAboutHeaderModals {
  iconType: AboutHeaderIconType;
  setIconType: React.Dispatch<AboutHeaderIconType>;
}

function AboutHeaderModals({ iconType, setIconType }: IAboutHeaderModals) {
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (iconType) setIsModal(true);
    if (!isModal) setIconType(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconType, isModal]);

  return (
    <>
      {iconType === "rule" && (
        <ModalPortal setIsModal={setIsModal}>
          <StudyRuleModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
      {iconType === "promotion" && (
        <ModalPortal setIsModal={setIsModal}>
          <PromotionModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
      {iconType === "attendCheck" && (
        <ModalPortal setIsModal={setIsModal}>
          <AttendCheckModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
      {iconType === "attendCheckWin" && (
        <ModalPortal setIsModal={setIsModal}>
          <AttendCheckWinModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
      {iconType === "rabbit" && (
        <ModalPortal setIsModal={setIsModal}>
          {/* <RegularGatherModal
              setIsRabbitRun={setIsRabbitRun}
              setIsModal={setIsRabbit}
            /> */}
          <RegularGatherResultModal
            setIsModal={setIsModal}
            setIsRabbitRun={setIsModal}
          />
        </ModalPortal>
      )}
    </>
  );
}

export default AboutHeaderModals;
