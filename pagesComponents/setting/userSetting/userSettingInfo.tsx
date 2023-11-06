import { useSession } from "next-auth/react";
import { useUserRoleMutation } from "../../../hooks/user/mutations";

function UserSettingInfo() {
  const { data: session } = useSession();

  const { mutate: setRole } = useUserRoleMutation();

  // const { role, rest } = userInfo || {};
  //휴식 만료 설정
  // useStudyArrivedCntQuery(session?.uid as string, {
  //   enabled:
  //     (role === "resting" && dayjs() > dayjs(rest.endDate)) || role === "human",
  //   onSuccess(data) {
  //     if (role === "human" && data >= 2) {
  //       setRole("member");
  //     }
  //   },

  return null;
}

export default UserSettingInfo;
