import { useEffect, useState } from "react";
import ModalPortal from "../../../components/common/ModalPortal";
import {
  ATTEND_POP_UP,
  PROMOTION_POP_UP,
  SUGGEST_POP_UP,
  USER_GUIDE,
} from "../../../constants/localStorage";
import { checkAndSetLocalStorage } from "../../../helpers/storageHelpers";
import PromotionModal from "../../../modals/aboutHeader/promotionModal/PromotionModal";
import LastWeekAttendPopUp from "../../../modals/pop-up/LastWeekAttendPopUp";
import ProfileModifyPopUp from "../../../modals/pop-up/ProfileModifyPopUp";
import SuggestPopUp from "../../../modals/pop-up/SuggestPopUp";
import UserGuidePopUp from "../../../modals/pop-up/UserGuidePopUp";

interface IUserSettingPopUp {
  isProfileEdit: boolean;
}

export type UserPopUp =
  | "lastWeekAttend"
  | "profileEdit"
  | "suggest"
  | "promotion"
  | "userGuide";

function UserSettingPopUp({ isProfileEdit }: IUserSettingPopUp) {
  const [popUpTypes, setPopUpTypes] = useState<UserPopUp[]>([]);

  useEffect(() => {
    let popUpCnt = 0;
    if (isProfileEdit) setPopUpTypes((old) => [...old, "profileEdit"]);
    if (!checkAndSetLocalStorage(USER_GUIDE, 15)) {
      setPopUpTypes((old) => [...old, "userGuide"]);
      if (++popUpCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(PROMOTION_POP_UP, 3)) {
      setPopUpTypes((old) => [...old, "promotion"]);
      if (++popUpCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(SUGGEST_POP_UP, 7)) {
      setPopUpTypes((old) => [...old, "suggest"]);
      if (++popUpCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(ATTEND_POP_UP, 7)) {
      setPopUpTypes((old) => [...old, "lastWeekAttend"]);
      if (++popUpCnt === 2) return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileEdit]);

  const filterPopUpTypes = (type: UserPopUp) => {
    setPopUpTypes((popUps) => popUps.filter((popUp) => popUp !== type));
  };

  return (
    <>
      {popUpTypes.includes("lastWeekAttend") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("lastWeekAttend")}>
          <LastWeekAttendPopUp
            setIsModal={() => filterPopUpTypes("lastWeekAttend")}
          />
        </ModalPortal>
      )}
      {popUpTypes.includes("profileEdit") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("profileEdit")}>
          <ProfileModifyPopUp
            setIsModal={() => filterPopUpTypes("profileEdit")}
          />
        </ModalPortal>
      )}
      {popUpTypes.includes("suggest") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("suggest")}>
          <SuggestPopUp setIsModal={() => filterPopUpTypes("suggest")} />
        </ModalPortal>
      )}
      {popUpTypes.includes("promotion") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("promotion")}>
          <PromotionModal setIsModal={() => filterPopUpTypes("promotion")} />
        </ModalPortal>
      )}
      {popUpTypes.includes("userGuide") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("userGuide")}>
          <UserGuidePopUp setIsModal={() => filterPopUpTypes("userGuide")} />
        </ModalPortal>
      )}
    </>
  );
}

export default UserSettingPopUp;
