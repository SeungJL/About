import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { FAQ_POP_UP } from "../../constants/keys/localStorage";
import { checkAndSetLocalStorage } from "../../helpers/storageHelpers";
import FAQPopUp from "../../modals/pop-up/FAQPopUp";

import { isMainLoadingState } from "../../recoil/loadingAtoms";
import UserSettingPopUp from "./userSetting/userSettingPopUp";

export default function UserSetting() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const isMainLoading = useRecoilValue(isMainLoadingState);
  const isPopUpCondition = !isMainLoading && !isGuest;

  const [isGuestPopUp, setIsGuestPopUp] = useState(false);
 
  useEffect(() => {
    if (isGuest) {
      if (!checkAndSetLocalStorage(FAQ_POP_UP, 2)) setIsGuestPopUp(true);
      return;
    }
  }, [isGuest]);

  return (
    <>
      {/* <UserSettingInfo /> */}
      {isPopUpCondition && <UserSettingPopUp />}
      {isGuestPopUp && <FAQPopUp setIsModal={setIsGuestPopUp} />}
    </>
  );
}
