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

function UserSettingPopUp({ isProfileEdit }: IUserSettingPopUp) {
  const [isAttend, setIsAttend] = useState(false);
  const [isUserGuide, setIsUserGuide] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isSuggest, setIsSuggest] = useState(false);

  useEffect(() => {
    let popupCnt = 0;

    if (isProfileEdit) {
      setIsProfile(true);
      popupCnt++;
    }
    if (!checkAndSetLocalStorage(USER_GUIDE, 15)) {
      setIsUserGuide(true);
      if (++popupCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(PROMOTION_POP_UP, 3)) {
      setIsPromotion(true);
      if (++popupCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(SUGGEST_POP_UP, 7)) {
      setIsSuggest(true);
      if (++popupCnt === 2) return;
    }
    if (!checkAndSetLocalStorage(ATTEND_POP_UP, 7)) {
      setIsAttend(true);
      if (++popupCnt === 2) return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileEdit]);

  return (
    <>
      {isAttend && (
        <ModalPortal setIsModal={setIsAttend}>
          <LastWeekAttendPopUp setIsModal={setIsAttend} />
        </ModalPortal>
      )}
      {isProfile && (
        <ModalPortal setIsModal={setIsProfile}>
          <ProfileModifyPopUp setIsModal={setIsProfile} />
        </ModalPortal>
      )}
      {isSuggest && (
        <ModalPortal setIsModal={setIsSuggest}>
          <SuggestPopUp setIsModal={setIsSuggest} />
        </ModalPortal>
      )}
      {isPromotion && (
        <ModalPortal setIsModal={setIsPromotion}>
          <PromotionModal setIsModal={setIsPromotion} />
        </ModalPortal>
      )}
      {isUserGuide && (
        <ModalPortal setIsModal={setIsUserGuide}>
          <UserGuidePopUp setIsModal={setIsUserGuide} />
        </ModalPortal>
      )}
    </>
  );
}

export default UserSettingPopUp;
