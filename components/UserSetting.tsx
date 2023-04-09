import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";

import RegisterFormModal from "../modals/user/RegisterFormModal";
import WeekAttendPopup from "../modals/pop-up/LastWeekAttendPopUp";

import { useSetRecoilState } from "recoil";
import { isNoticeAlertState } from "../recoil/utilityAtoms";
import { numOfUserState } from "../recoil/userAtoms";

import { NOTICE_ALERT } from "../constants/localStorage";
import { IUser } from "../types/user";
import { useActiveQuery } from "../hooks/user/queries";

export default function UserSetting({ UserList }: { UserList: IUser[] }) {
  const { data: session } = useSession();

  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);
  const setNumOfUser = useSetRecoilState(numOfUserState);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [isAttendPopup, setIsAttendPopup] = useState(false);

  const user = useActiveQuery().data;

  useEffect(() => {
    setNumOfUser(UserList?.filter((user) => user.isActive).length);
    if (!user?.registerDate) setIsRegisterModal(true);
    else {
      setIsRegisterModal(false);
    }
  }, [session, user?.registerDate]);

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
