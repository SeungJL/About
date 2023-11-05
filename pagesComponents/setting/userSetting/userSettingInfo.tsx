import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { FAQ_POP_UP } from "../../../constants/keys/localStorage";
import { checkAndSetLocalStorage } from "../../../helpers/storageHelpers";
import { useStudyArrivedCntQuery } from "../../../hooks/study/queries";
import { useUserRoleMutation } from "../../../hooks/user/mutations";
import FAQPopUp from "../../../modals/pop-up/FAQPopUp";
import { isGuestState, locationState } from "../../../recoil/userAtoms";
import { IUser } from "../../../types/user/user";

interface IUserSettingInfo {
  userInfo: IUser;
}

function UserSettingInfo({ userInfo }: IUserSettingInfo) {
  const { data: session } = useSession();

  const setLocation = useSetRecoilState(locationState);
  const setIsGuest = useSetRecoilState(isGuestState);

  const [isGuestPopUp, setIsGuestPopUp] = useState(false);

  useEffect(() => {
    const isGuest = session?.user.name === "guest";
    //게스트 설정
    if (isGuest) {
      setLocation("수원");
      setIsGuest(true);
      if (!checkAndSetLocalStorage(FAQ_POP_UP, 2)) setIsGuestPopUp(true);
      return;
    }
    if (userInfo) setLocation(userInfo.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, userInfo]);

  const { mutate: setRole } = useUserRoleMutation();

  const { role, rest } = userInfo || {};
  //휴식 만료 설정
  useStudyArrivedCntQuery(session?.uid, {
    enabled:
      (role === "resting" && dayjs() > dayjs(rest.endDate)) || role === "human",
    onSuccess(data) {
      if (role === "human" && data >= 2) {
        setRole("member");
      }
    },
  });

  return <> {isGuestPopUp && <FAQPopUp setIsModal={setIsGuestPopUp} />}</>;
}

export default UserSettingInfo;
