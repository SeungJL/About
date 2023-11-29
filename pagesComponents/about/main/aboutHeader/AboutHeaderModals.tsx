import { useEffect, useState } from "react";
import DailyCheckModal from "../../../../modals/aboutHeader/dailyCheckModal/DailyCheckModal";
import DailyCheckWinModal from "../../../../modals/aboutHeader/dailyCheckModal/DailyCheckWinModal";
import EnthusiasticModal from "../../../../modals/aboutHeader/EnthusiasticModal/EnthusiasticModal";

import PointSystemsModal from "../../../../modals/aboutHeader/pointSystemsModal/PointSystemsModal";

import { AboutHeaderIconType } from "./AboutHeader";

interface IAboutHeaderModals {
  iconType: AboutHeaderIconType;
  setIconType: React.Dispatch<AboutHeaderIconType>;
}

function AboutHeaderModals({ iconType, setIconType }: IAboutHeaderModals) {
  const [isModal, setIsModal] = useState<boolean>();

  useEffect(() => {
    if (iconType) setIsModal(true);
    if (isModal === false) setIconType(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconType, isModal]);

  return (
    <>
      {iconType === "rule" && <PointSystemsModal setIsModal={setIsModal} />}
      {iconType === "attendCheck" && (
        <DailyCheckModal setIsModal={setIsModal} />
      )}
      {iconType === "attendCheckWin" && (
        <DailyCheckWinModal setIsModal={setIsModal} />
      )}
      {iconType === "rabbit" && <EnthusiasticModal setIsModal={setIsModal} />}
    </>
  );
}

export default AboutHeaderModals;
