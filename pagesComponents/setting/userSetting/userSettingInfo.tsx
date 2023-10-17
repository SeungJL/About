import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useStudyArrivedCntQuery } from "../../../hooks/study/queries";
import { useUserRoleMutation } from "../../../hooks/user/mutations";
import { isGuestState, locationState } from "../../../recoil/userAtoms";
import { IUser } from "../../../types/user/user";

interface IUserSettingInfo {
  userInfo: IUser;
}

function UserSettingInfo({ userInfo }: IUserSettingInfo) {
  const { data: session } = useSession();

  const setLocation = useSetRecoilState(locationState);
  const setIsGuest = useSetRecoilState(isGuestState);

  const role = userInfo?.role;
  const rest = userInfo?.rest;

  useEffect(() => {
    //게스트 설정
    const isGuest = session?.user.name === "guest";
    if (isGuest) {
      setLocation("수원");
      setIsGuest(true);
      return;
    }
    if (!userInfo) return;
    
    //지역 설정
    setLocation(userInfo.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, userInfo]);

  const { mutate: setRole } = useUserRoleMutation();

  //휴식 만료 설정
  useStudyArrivedCntQuery({
    enabled: role === "resting" && dayjs() > dayjs(rest.endDate),
    onSuccess(data) {
      if (role === "human" && data[session.uid as string] >= 2)
        setRole("member");
      if (role === "member" && data[session.uid as string] < 2)
        setRole("human");
    },
  });

  return null;
}

export default UserSettingInfo;
