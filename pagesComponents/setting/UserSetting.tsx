import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ModalPortal from "../../components/modals/ModalPortal";
import { FAQ_POP_UP } from "../../constants/keys/localStorage";
import { checkAndSetLocalStorage } from "../../helpers/storageHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import FAQPopUp from "../../modals/pop-up/FAQPopUp";

import { isMainLoadingState } from "../../recoil/loadingAtoms";
import UserSettingInfo from "./userSetting/userSettingInfo";
import UserSettingPopUp from "./userSetting/userSettingPopUp";

export default function UserSetting() {
  const typeErrorToast = useTypeErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const isMainLoading = useRecoilValue(isMainLoadingState);

  const [isGuestPopUp, setIsGuestPopUp] = useState(false);

  const isPopUpCondition = !isMainLoading && !isGuest;

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
    onError: (e) => typeErrorToast(e, "user"),
  });

  useEffect(() => {
    if (!checkAndSetLocalStorage(FAQ_POP_UP, 2)) {
      setIsGuestPopUp(true);
    }
  }, []);

  return (
    <>
      <UserSettingInfo userInfo={userInfo} />
      {isPopUpCondition && (
        <UserSettingPopUp isProfileEdit={userInfo?.majors?.length === 0} />
      )}
      {isGuestPopUp && (
        <ModalPortal setIsModal={setIsGuestPopUp}>
          <FAQPopUp setIsModal={setIsGuestPopUp} />
        </ModalPortal>
      )}
    </>
  );
}
