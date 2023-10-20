import { useEffect, useState } from "react";
import DailyCheckModal from "../../../../modals/aboutHeader/dailyCheckModal/DailyCheckModal";
import DailyCheckWinModal from "../../../../modals/aboutHeader/dailyCheckModal/DailyCheckWinModal";

import PointSystemsModal from "../../../../modals/aboutHeader/pointSystemsModal/PointSystemsModal";
import RegularGatherResultModal from "../../../../modals/aboutHeader/regularGatherModal/RegularGatherResultModal";

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
      {iconType === "rule" && <PointSystemsModal setIsModal={setIsModal} />}
      {iconType === "attendCheck" && (
        <DailyCheckModal setIsModal={setIsModal} />
      )}
      {iconType !== "attendCheckWin" && (
        <DailyCheckWinModal setIsModal={setIsModal} />
      )}
      {iconType === "rabbit" && (
        <RegularGatherResultModal
          setIsModal={setIsModal}
          setIsRabbitRun={setIsModal}
        />
      )}
    </>
  );
}

export default AboutHeaderModals;
