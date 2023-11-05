import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";

import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { userInfoState } from "../../recoil/userAtoms";
import UserSettingInfo from "./userSetting/userSettingInfo";
import UserSettingPopUp from "./userSetting/userSettingPopUp";

export default function UserSetting() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const userInfo = useRecoilValue(userInfoState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

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
