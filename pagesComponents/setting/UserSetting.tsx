import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ModalPortal from "../../components/common/ModalPortal";
import {
  ATTEND_POP_UP,
  NOTICE_ALERT,
  PROFILE_POP_UP,
  PROMOTION_POP_UP,
  USER_GUIDE,
} from "../../constants/localStorage";
import { ensureLocalStorage } from "../../helpers/storageHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useStudyArrivedCntQuery } from "../../hooks/study/queries";
import { useUserRoleMutation } from "../../hooks/user/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import PromotionModal from "../../modals/aboutHeader/promotionModal/PromotionModal";
import LastWeekAttendPopUp from "../../modals/pop-up/LastWeekAttendPopUp";
import ProfileModifyPopUp from "../../modals/pop-up/ProfileModifyPopUp";

import UserGuidePopUp from "../../modals/pop-up/UserGuidePopUp";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { isNoticeAlertState } from "../../recoil/renderTriggerAtoms";
import { isGuestState, userLocationState } from "../../recoil/userAtoms";
import { IUser } from "../../types/user/user";

export default function UserSetting() {
  const typeErrorToast = useTypeErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const isMainLoading = useRecoilValue(isMainLoadingState);
  const [location, setLocation] = useRecoilState(userLocationState);
  const setIsNoticeAlert = useSetRecoilState(isNoticeAlertState);
  const setIsGuest = useSetRecoilState(isGuestState);

  const [myProfileNull, setMyProfileNull] = useState(false);
  const [isAttend, setIsAttend] = useState(false);
  const [isUserGuide, setIsUserGuide] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);

  const { mutate: setRole } = useUserRoleMutation();

  const setInitialSetting = (data: IUser) => {
    if (!data) return;
    if (!location) setLocation(data.location);
    if (!data?.majors?.length) setMyProfileNull(true);
    const rest = data?.rest;
    if (rest && dayjs() < dayjs(rest.endDate)) setRole("resting");
  };

  const { data: userInfo, isLoading } = useUserInfoQuery({
    enabled: !isGuest,
    onSuccess: setInitialSetting,
    onError: (e) => typeErrorToast(e, "user"),
  });

  const role = userInfo?.role;

  useStudyArrivedCntQuery({
    enabled: role === "human" || role === "member",
    onSuccess(data) {
      if (role === "human" && data[session.uid as string] >= 2)
        setRole("member");
      if (role === "member" && data[session.uid as string] < 2)
        setRole("human");
    },
  });

  useEffect(() => {
    if (isLoading) return;

    const promotion = localStorage.getItem(PROMOTION_POP_UP);

    if (isGuest) {
      setIsGuest(true);
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
    if (!promotion || dayjs(promotion).add(3, "day") <= dayjs()) {
      localStorage.setItem(PROMOTION_POP_UP, dayjs().format("YYYYMMDD"));
      setIsPromotion(true);
      popupCnt++;
    }
    if (popupCnt === 2) return;

    if (!ensureLocalStorage(ATTEND_POP_UP)) setIsAttend(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, isLoading, myProfileNull]);

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
