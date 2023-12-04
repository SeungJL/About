import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FAQ_POP_UP } from "../../constants/keys/localStorage";
import { checkAndSetLocalStorage } from "../../helpers/storageHelpers";
import { useUserInfoQuery } from "../../hooks/user/queries";
import FAQPopUp from "../../modals/pop-up/FAQPopUp";

import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { isGuestState, userInfoState } from "../../recoil/userAtoms";
import UserSettingPopUp from "./userSetting/userSettingPopUp";

export default function UserSetting() {
  const isGuest = useRecoilValue(isGuestState);
  const isMainLoading = useRecoilValue(isMainLoadingState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [isGuestPopUp, setIsGuestPopUp] = useState(false);

  const isPopUpCondition = !isMainLoading && !isGuest;

  const { data: userInfoData } = useUserInfoQuery({
    enabled: isGuest === false,
  });

  useEffect(() => {
    if (!userInfoData) return;
    if (isGuest === false && !userInfo) {
      setUserInfo(userInfoData);
    }
    if (isGuest && !checkAndSetLocalStorage(FAQ_POP_UP, 2)) {
      setIsGuestPopUp(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, userInfo, userInfoData]);

  return (
    <>
      {isPopUpCondition && <UserSettingPopUp />}
      {isGuestPopUp && <FAQPopUp setIsModal={setIsGuestPopUp} />}
    </>
  );
}
