import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ModalPortal from "../../components/ModalPortal";
import {
  ATTEND_POP_UP,
  NOTICE_ALERT,
  PROFILE_POP_UP,
  PROMOTION_POP_UP1,
  PROMOTION_POP_UP2,
  USER_GUIDE,
} from "../../constants/localStorage";
import { useStudyArrivedCntQuery } from "../../hooks/study/queries";
import { useUserRoleMutation } from "../../hooks/user/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { ensureLocalStorage } from "../../libs/utils/localStorageUtils";
import PromotionModal from "../../modals/aboutHeader/promotionModal/PromotionModal";
import ProfileModifyPopUp from "../../modals/pop-up/ProfileModifyPopUp";
import SuggestPopUp from "../../modals/pop-up/SuggestPopUp";
import UserGuidePopUp from "../../modals/pop-up/UserGuidePopUp";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { isNoticeAlertState } from "../../recoil/renderTrigger2Atoms";
import { userLocationState } from "../../recoil/userAtoms";

export default function UserSetting() {
  const { data: session } = useSession();
  const isGuest = session && session?.user.name === "guest";

  const [location, setLocation] = useRecoilState(userLocationState);
  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

  const [isAttendPopup, setIsAttendPopup] = useState(false);
  const [isUserGuide, setIsUserGuide] = useState(false);
  const [isSuggest, setIsSuggest] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [myProfileNull, setMyProfileNull] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);

  const { data: userData, isLoading } = useUserInfoQuery({
    enabled: isGuest === false,
    onSuccess(data) {
      if (!data?.majors?.length) setMyProfileNull(true);
    },
    onError(error) {
      console.error(error);
    },
  });

  const { data: arrivedCntTotal } = useStudyArrivedCntQuery();
  const { mutate: setRole } = useUserRoleMutation();

  useEffect(() => {
    if (!session) return;
    if (userData?.role !== "human" && arrivedCntTotal) {
      if (arrivedCntTotal[session?.uid as string] >= 2) setRole("member");
    }
    const rest = userData?.rest;
    if (!rest) return;
    if (dayjs() < dayjs(rest?.endDate)) setRole("resting");
  }, [userData, arrivedCntTotal, session?.uid]);

  useEffect(() => {
    if (!session || isLoading) return;
    if (!location) {
      if (isGuest) setLocation("수원");
      else setLocation(userData?.location);
      return;
    }
    if (isGuest) return;

    let popupCnt = 0;
    if (!localStorage.getItem(NOTICE_ALERT)) setIsNoticeAlert(true);
    if (!ensureLocalStorage(PROFILE_POP_UP) && myProfileNull) {
      setIsProfile(true);
      popupCnt++;
    }
    if (!ensureLocalStorage(USER_GUIDE)) {
      setIsUserGuide(true);
      popupCnt++;
    }
    if (popupCnt === 2) return;
    if (!ensureLocalStorage(PROMOTION_POP_UP1, PROMOTION_POP_UP2)) {
      // setIsPromotion(true);
      popupCnt++;
    }
    if (popupCnt === 2) return;
    if (!ensureLocalStorage(ATTEND_POP_UP)) {
      setIsAttendPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, isLoading, location, myProfileNull, userData, session]);

  return (
    <>
      {!isMainLoading && (
        <>
          {/* {isAttendPopup && (
            <ModalPortal setIsModal={setIsAttendPopup}>
              <WeekAttendPopup closePopUp={setIsAttendPopup} />
            </ModalPortal>
          )} */}
          {isSuggest && (
            <ModalPortal setIsModal={setIsSuggest}>
              <SuggestPopUp setIsModal={setIsSuggest} />
            </ModalPortal>
          )}
          {isProfile && (
            <ModalPortal setIsModal={setIsProfile}>
              <ProfileModifyPopUp setIsModal={setIsProfile} />
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
      )}
    </>
  );
}
