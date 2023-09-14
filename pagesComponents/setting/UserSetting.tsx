import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";

import { isMainLoadingState } from "../../recoil/loadingAtoms";
import UserSettingInfo from "./userSetting/userSettingInfo";
import UserSettingPopUp from "./userSetting/userSettingPopUp";

export default function UserSetting() {
  const typeErrorToast = useTypeErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const isMainLoading = useRecoilValue(isMainLoadingState);

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
    onError: (e) => typeErrorToast(e, "user"),
  });

  const isPopUpCondition = !isMainLoading && !isGuest;

  return (
    <>
      <UserSettingInfo userInfo={userInfo} />
      {isPopUpCondition && (
        <UserSettingPopUp isProfileEdit={userInfo?.majors?.length === 0} />
      )}
    </>
  );
}
