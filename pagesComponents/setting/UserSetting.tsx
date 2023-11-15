import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
  const setUserInfo = useSetRecoilState(userInfoState);

  const [isGuestPopUp, setIsGuestPopUp] = useState(false);

  const isPopUpCondition = !isMainLoading && !isGuest;

  useEffect(() => {
    if (isGuest && !checkAndSetLocalStorage(FAQ_POP_UP, 2)) {
      setIsGuestPopUp(true);
    }
  }, [isGuest]);

  useUserInfoQuery({
    enabled: isGuest !== false,
    onSuccess(data) {
     
      setUserInfo(data);
    },
  });

  return (
    <>
      {isPopUpCondition && <UserSettingPopUp />}
      {isGuestPopUp && <FAQPopUp setIsModal={setIsGuestPopUp} />}
    </>
  );
}
