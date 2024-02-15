import { useEffect, useState } from "react";
import DailyCheckModal from "../../../modals/aboutHeader/dailyCheckModal/DailyCheckModal";
import PointSystemsModal from "../../../modals/aboutHeader/pointSystemsModal/PointSystemsModal";
import { HomeHeaderIconType } from "./HomeHeader";

interface IHomeHeaderModals {
  iconType: HomeHeaderIconType;
  setIconType: React.Dispatch<HomeHeaderIconType>;
}

function HomeHeaderModals({ iconType, setIconType }: IHomeHeaderModals) {
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
      {/* {iconType === "attendCheckWin" && (
        <DailyCheckWinModal setIsModal={setIsModal} />
      )}
      {iconType === "rabbit" && <EnthusiasticModal setIsModal={setIsModal} />} */}
    </>
  );
}

export default HomeHeaderModals;
