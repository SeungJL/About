import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ModalPortal from "../components/ModalPortal";

import RegisterFormModal from "../modals/user/RegisterFormModal";
import WeekAttendPopup from "../modals/pop-up/LastWeekAttendPopUp";

import { useRecoilState, useSetRecoilState } from "recoil";
import { isNoticeAlertState } from "../recoil/utilityAtoms";
import { numOfUserState } from "../recoil/userAtoms";

import {
  ATTEND_POP_UP,
  NOTICE_ALERT,
  POP_UP,
  USER_GUIDE,
} from "../constants/localStorage";
import { IUser } from "../types/user";
import { useUserInfoQuery, useIsActiveQuery } from "../hooks/user/queries";
import { locationState } from "../recoil/systemAtoms";
import { usePlazaDataQuery } from "../hooks/plaza/queries";
import UserGuidePopUp from "../modals/pop-up/UserGuidePopUp";
import SuggestPopUp from "../modals/pop-up/SuggestPopUp";

export default function UserSetting() {
  const { data: session } = useSession();

  const isGuest = session && session?.user.name === "guest";

  const [location, setLocation] = useRecoilState(locationState);
  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);
  const setNumOfUser = useSetRecoilState(numOfUserState);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [isAttendPopup, setIsAttendPopup] = useState(false);
  const [isUserGuide, setIsUserGuide] = useState(false);
  const [isSuggest, setIsSuggest] = useState(false);

  const { data: userData, isLoading } = useUserInfoQuery({
    enabled: isGuest === false,
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
    if (isGuest === false && isActive !== undefined && !isActive)
      setIsRegisterModal(true);
    else setIsRegisterModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isActive, isActiveLoading]);

  useEffect(() => {
    if (isGuest) return;
    if (!localStorage.getItem(POP_UP)) {
      setIsSuggest(true);
      localStorage.setItem(POP_UP, "read");
      return;
    }
    if (localStorage.getItem(POP_UP) && !localStorage.getItem(ATTEND_POP_UP)) {
      setIsAttendPopup(true);
      localStorage.setItem(ATTEND_POP_UP, "read");
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(NOTICE_ALERT)) setIsNoticeAlert(true);
    if (!localStorage.getItem(USER_GUIDE)) setIsUserGuide(true);
  }, [setIsNoticeAlert]);

  return (
    <>
      {isAttendPopup && (
        <ModalPortal setIsModal={setIsAttendPopup}>
          <WeekAttendPopup closePopUp={setIsAttendPopup} />
        </ModalPortal>
      )}
      {isRegisterModal && (
        <ModalPortal setIsModal={setIsRegisterModal}>
          <RegisterFormModal setIsModal={setIsRegisterModal} />
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
    </>
  );
}
