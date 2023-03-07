import React from "react";
import { getToday } from "../../libs/utils/dateUtils";
import { useEffect, useState } from "react";
import { useVoteRateQuery } from "../../hooks/user/queries";
import ModalPortal from "../../libs/utils/ModalPortal";
import LastWeekAttendPopUp from "../../modals/PopUp/LastWeekAttendPopUp";

export default function UserInfoCheck() {
  const today = getToday();
  const [isShowAttendPopUp, setIsShowAttendPopUp] = useState(false);

  const lastWeekAttendPopUp = "lastWeekAttendPopUp";

  useEffect(() => {
    if (localStorage.getItem(lastWeekAttendPopUp) !== "true") {
      localStorage.setItem(lastWeekAttendPopUp, "true");
    }
  }, []);
  return (
    <>
      {isShowAttendPopUp && (
        <ModalPortal closePortal={setIsShowAttendPopUp}>
          <LastWeekAttendPopUp closePopUp={setIsShowAttendPopUp} />
        </ModalPortal>
      )}
    </>
  );
}
