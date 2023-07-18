import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ModalPortal from "../../components/ModalPortal";
import {
  ATTEND_POP_UP,
  NOTICE_ALERT,
  PROFILE_POP_UP,
  PROMOTION_POP_UP1,
  PROMOTION_POP_UP2,
  USER_GUIDE,
} from "../../constants/localStorage";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useStudyArrivedCntQuery } from "../../hooks/study/queries";
import { useUserRoleMutation } from "../../hooks/user/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { ensureLocalStorage } from "../../libs/storage";
import PromotionModal from "../../modals/aboutHeader/promotionModal/PromotionModal";
import LastWeekAttendPopUp from "../../modals/pop-up/LastWeekAttendPopUp";
import ProfileModifyPopUp from "../../modals/pop-up/ProfileModifyPopUp";

import UserGuidePopUp from "../../modals/pop-up/UserGuidePopUp";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { isNoticeAlertState } from "../../recoil/renderTriggerAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import { IUser } from "../../types/user/user";

export default function UserSetting() {
  const typeErrorToast = useTypeErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const isMainLoading = useRecoilValue(isMainLoadingState);
  const setLocation = useSetRecoilState(userLocationState);
  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);

  const [myProfileNull, setMyProfileNull] = useState(false);
  const [isAttend, setIsAttend] = useState(false);
  const [isUserGuide, setIsUserGuide] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);

  const { mutate: setRole } = useUserRoleMutation();

  const setInitialSetting = (data: IUser) => {
    setLocation(data.location);
    if (!data?.majors?.length) setMyProfileNull(true);
    const rest = data?.rest;
    if (rest && dayjs() < dayjs(rest.endDate)) setRole("resting");
  };

  const { data: userInfo, isLoading } = useUserInfoQuery({
    enabled: isGuest === false,
    onSuccess: setInitialSetting,
    onError: (e) => typeErrorToast(e, "user"),
  });

  useStudyArrivedCntQuery({
    enabled: userInfo?.role === "human",
    onSuccess(data) {
      if (data[session.uid as string] >= 2) setRole("member");
    },
  });

  useEffect(() => {
    if (isLoading) return;
    if (isGuest) {
      setLocation("수원");
      return;
    }
    let popupCnt = 0;
    if (!localStorage.getItem(NOTICE_ALERT)) setIsNoticeAlert(true);
    if (myProfileNull && !ensureLocalStorage(PROFILE_POP_UP)) {
      setIsProfile(true);
      popupCnt++;
    }
    if (!ensureLocalStorage(USER_GUIDE)) {
      setIsUserGuide(true);
      popupCnt++;
    }
    if (popupCnt === 2) return;
    if (!ensureLocalStorage(PROMOTION_POP_UP1, PROMOTION_POP_UP2)) {
      setIsPromotion(true);
      popupCnt++;
    }
    if (popupCnt === 2) return;
    if (!ensureLocalStorage(ATTEND_POP_UP)) setIsAttend(true);
  }, [isGuest, isLoading, myProfileNull, setIsNoticeAlert, setLocation]);

  if (isMainLoading) return null;

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
