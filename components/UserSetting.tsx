import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";

import RegisterFormModal from "../modals/user/RegisterFormModal";
import WeekAttendPopup from "../modals/pop-up/LastWeekAttendPopUp";

import { useRecoilState, useSetRecoilState } from "recoil";
import { isNoticeAlertState } from "../recoil/utilityAtoms";
import { numOfUserState } from "../recoil/userAtoms";

import { NOTICE_ALERT } from "../constants/localStorage";
import { IUser } from "../types/user";
import { useUserInfoQuery, useIsActiveQuery } from "../hooks/user/queries";
import { locationState } from "../recoil/systemAtoms";

export default function UserSetting({ UserList }: { UserList: IUser[] }) {
  const { data: session } = useSession();

  const isGuest = session && session?.user.name === "guest";

  const [location, setLocation] = useRecoilState(locationState);
  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);
  const setNumOfUser = useSetRecoilState(numOfUserState);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [isAttendPopup, setIsAttendPopup] = useState(false);

  const { data: userData, isLoading } = useUserInfoQuery({
    enabled: isGuest === false,
    onError(error) {
      console.error(error);
    },
  });
  const { data } = useIsActiveQuery({
    onError(error) {
      console.error(error);
    },
  });

  const isActive = data?.isActive;

  useEffect(() => {
    if (!isLoading) setLocation(userData?.location);
    if (isGuest) setLocation("수원");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isGuest]);

  useEffect(() => {
    setNumOfUser(UserList?.filter((user) => user.isActive).length);
    if (isGuest === false && isActive !== undefined && !isActive)
      setIsRegisterModal(true);
    else {
      setIsRegisterModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isActive]);

  useEffect(() => {
    if (!localStorage.getItem(NOTICE_ALERT)) setIsNoticeAlert(true);
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
    </>
  );
}
