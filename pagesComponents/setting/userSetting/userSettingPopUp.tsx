import { useEffect, useState } from "react";
import ModalPortal from "../../../components/modals/ModalPortal";
import {
  ATTEND_POP_UP,
  FAQ_POP_UP,
  PROMOTION_POP_UP,
  STUDY_SPACE_POP_UP,
  SUGGEST_POP_UP,
  USER_GUIDE_POP_UP,
} from "../../../constants/keys/localStorage";
import { checkAndSetLocalStorage } from "../../../helpers/storageHelpers";
import PointSystemsModal from "../../../modals/aboutHeader/pointSystemsModal/PointSystemsModal";
import PromotionModal from "../../../modals/aboutHeader/promotionModal/PromotionModal";
import FAQPopUp from "../../../modals/pop-up/FAQPopUp";
import FreeStudySpacePopUp from "../../../modals/pop-up/FreeStudySpacePopUp";
import LastWeekAttendPopUp from "../../../modals/pop-up/LastWeekAttendPopUp";
import ProfileModifyPopUp from "../../../modals/pop-up/ProfileModifyPopUp";
import SuggestPopUp from "../../../modals/pop-up/SuggestPopUp";

interface IUserSettingPopUp {
  isProfileEdit: boolean;
}

export type UserPopUp =
  | "lastWeekAttend"
  | "profileEdit"
  | "suggest"
  | "promotion"
  | "userGuide"
  | "studySpace"
  | "faq";

function UserSettingPopUp({ isProfileEdit }: IUserSettingPopUp) {
  const [popUpTypes, setPopUpTypes] = useState<UserPopUp[]>([]);

  useEffect(() => {
    let popUpCnt = 0;
    if (isProfileEdit) setPopUpTypes((old) => [...old, "profileEdit"]);
    if (!checkAndSetLocalStorage(FAQ_POP_UP, 7)) {
      setPopUpTypes((old) => [...old, "faq"]);
      if (++popUpCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(STUDY_SPACE_POP_UP, 4)) {
      setPopUpTypes((old) => [...old, "studySpace"]);
      if (++popUpCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(USER_GUIDE_POP_UP, 15)) {
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
      {popUpTypes.includes("faq") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("faq")}>
          <FAQPopUp setIsModal={() => filterPopUpTypes("faq")} />
        </ModalPortal>
      )}
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
      {popUpTypes.includes("studySpace") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("studySpace")}>
          <FreeStudySpacePopUp
            setIsModal={() => filterPopUpTypes("studySpace")}
          />
        </ModalPortal>
      )}
      {popUpTypes.includes("promotion") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("promotion")}>
          <PromotionModal setIsModal={() => filterPopUpTypes("promotion")} />
        </ModalPortal>
      )}
      {popUpTypes.includes("userGuide") && (
        <ModalPortal setIsModal={() => filterPopUpTypes("userGuide")}>
          <PointSystemsModal setIsModal={() => filterPopUpTypes("userGuide")} />
        </ModalPortal>
      )}
    </>
  );
}

export default UserSettingPopUp;
