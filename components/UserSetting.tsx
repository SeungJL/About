import React from "react";
import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";
import RegisterFormModal from "../modals/user/RegisterFormModal";
import { useSession } from "next-auth/react";
import WeekAttendPopup from "../modals/pop-up/LastWeekAttendPopUp";

export default function UserSetting() {
  const { data: session } = useSession();
  const [isAttendPopup, setIsAttendPopup] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
 

  useEffect(() => {
    if (session?.isActive === false) setIsRegisterModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**유저 팝업 */
  useEffect(() => {
    // if (localStorage.getItem(LAST_WEEK_ATTEND) !== "true") {
    //   localStorage.setItem(LAST_WEEK_ATTEND, "true");
    // }
  }, []);

  return (
    <>
      {isAttendPopup && (
        <ModalPortal closePortal={setIsAttendPopup}>
          <WeekAttendPopup closePopUp={setIsAttendPopup} />
        </ModalPortal>
      )}
      {isRegisterModal && (
        <ModalPortal closePortal={setIsRegisterModal}>
          <RegisterFormModal setIsModal={setIsRegisterModal} />
        </ModalPortal>
      )}
    </>
  );
}
