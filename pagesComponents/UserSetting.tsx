import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ModalPortal from "../components/ModalPortal";

import WeekAttendPopup from "../modals/pop-up/LastWeekAttendPopUp";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { numOfUserState } from "../recoil/userAtoms";
import { isNoticeAlertState } from "../recoil/utilityAtoms";

import {
  ATTEND_POP_UP,
  NOTICE_ALERT,
  PROFILE_POP_UP,
  PROMOTION_POP_UP1,
  PROMOTION_POP_UP2,
} from "../constants/localStorage";
import { useIsActiveQuery, useUserInfoQuery } from "../hooks/user/queries";
import PromotionModal from "../modals/mainHeader/PromotionModal";
import ProfileModifyPopUp from "../modals/pop-up/ProfileModifyPopUp";
import SuggestPopUp from "../modals/pop-up/SuggestPopUp";
import UserGuidePopUp from "../modals/pop-up/UserGuidePopUp";
import { isMainLoadingState, locationState } from "../recoil/systemAtoms";

export default function UserSetting() {
  const { data: session } = useSession();

  const isGuest = session && session?.user.name === "guest";

  const [location, setLocation] = useRecoilState(locationState);
  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);
  const setNumOfUser = useSetRecoilState(numOfUserState);
  const [isAttendPopup, setIsAttendPopup] = useState(false);
  const [isUserGuide, setIsUserGuide] = useState(false);
  const [isSuggest, setIsSuggest] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [myProfileNull, setMyProfileNull] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);

  const isMainLoading = useRecoilValue(isMainLoadingState);

  const { data: userData, isLoading } = useUserInfoQuery({
    enabled: isGuest === false,
    onSuccess(data) {
      if (!data?.majors?.length) setMyProfileNull(true);
    },
    onError(error) {
      console.error(error);
    },
  });
  const { data, isLoading: isActiveLoading } = useIsActiveQuery({
    onError(error) {
      console.error(error);
    },
  });
  const isActive = data?.isActive?.isActive;

  useEffect(() => {
    if (!location) {
      if (!isLoading) setLocation(userData?.location);
      if (isGuest) setLocation("수원");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isGuest, location]);

  useEffect(() => {
    if (!isLoading) {
      if (isGuest) return;
      if (!localStorage.getItem(ATTEND_POP_UP)) {
        setIsAttendPopup(true);
        localStorage.setItem(ATTEND_POP_UP, "read");
      }
      if (!localStorage.getItem(PROFILE_POP_UP) && myProfileNull) {
        setIsProfile(true);
        localStorage.setItem(PROFILE_POP_UP, "read");
      }
      if (!localStorage.getItem(NOTICE_ALERT)) {
        setIsNoticeAlert(true);
      }
      if (!localStorage.getItem(PROMOTION_POP_UP1)) {
        setIsPromotion(true);
        localStorage.setItem(PROMOTION_POP_UP1, "read");
      }
      if (!localStorage.getItem(PROMOTION_POP_UP2)) {
        setIsPromotion(true);
        localStorage.setItem(PROMOTION_POP_UP2, "read");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, isLoading, userData]);

  // useEffect(() => {
  //   if (!localStorage.getItem(NOTICE_ALERT)) setIsNoticeAlert(true);
  //   if (!localStorage.getItem(USER_GUIDE)) setIsUserGuide(true);
  //   if (!localStorage.getItem(PROFILE_POP_UP)) setIsProfile(true);
  // }, []);

  return (
    <>
      {!isMainLoading && (
        <>
          {isAttendPopup && (
            <ModalPortal setIsModal={setIsAttendPopup}>
              <WeekAttendPopup closePopUp={setIsAttendPopup} />
            </ModalPortal>
          )}

          {isUserGuide && (
            <ModalPortal setIsModal={setIsUserGuide}>
              <UserGuidePopUp setIsModal={setIsUserGuide} />
            </ModalPortal>
          )}
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
        </>
      )}
    </>
  );
}
