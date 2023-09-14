import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ModalPortal from "../../../components/common/ModalPortal";
import {
  ATTEND_POP_UP,
  NOTICE_ALERT,
  PROMOTION_POP_UP,
  SUGGEST_POP_UP,
  USER_GUIDE,
} from "../../../constants/localStorage";
import { ensureLocalStorage } from "../../../helpers/storageHelpers";
import PromotionModal from "../../../modals/aboutHeader/promotionModal/PromotionModal";
import LastWeekAttendPopUp from "../../../modals/pop-up/LastWeekAttendPopUp";
import ProfileModifyPopUp from "../../../modals/pop-up/ProfileModifyPopUp";
import SuggestPopUp from "../../../modals/pop-up/SuggestPopUp";
import UserGuidePopUp from "../../../modals/pop-up/UserGuidePopUp";
import { isNoticeAlertState } from "../../../recoil/renderTriggerAtoms";

interface IUserSettingPopUp {
  isProfileEdit: boolean;
}

function UserSettingPopUp({ isProfileEdit }: IUserSettingPopUp) {
  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);

  const [myProfileNull, setMyProfileNull] = useState(false);
  const [isAttend, setIsAttend] = useState(false);
  const [isUserGuide, setIsUserGuide] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isSuggest, setIsSuggest] = useState(false);

  useEffect(() => {
    const promotion = localStorage.getItem(PROMOTION_POP_UP);
    const suggest = localStorage.getItem(SUGGEST_POP_UP);

    let popupCnt = 0;
    if (!localStorage.getItem(NOTICE_ALERT)) setIsNoticeAlert(true);
    if (isProfileEdit) {
      setIsProfile(true);
      popupCnt++;
    }
    if (!ensureLocalStorage(USER_GUIDE)) {
      setIsUserGuide(true);
      popupCnt++;
    }
    if (popupCnt === 2) return;

    if (!promotion || dayjs(promotion).add(3, "day") <= dayjs()) {
      localStorage.setItem(PROMOTION_POP_UP, dayjs().format("YYYYMMDD"));
      setIsPromotion(true);
      popupCnt++;
    }

    if (popupCnt === 2) return;
    if (!suggest || dayjs(suggest).add(1, "weeks") <= dayjs()) {
      localStorage.setItem(SUGGEST_POP_UP, dayjs().format("YYYYMMDD"));
      setIsSuggest(true);
      popupCnt++;
    }

    if (popupCnt === 2) return;
    if (!ensureLocalStorage(ATTEND_POP_UP)) setIsAttend(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
