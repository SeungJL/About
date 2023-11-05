/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useToken } from "../../hooks/token/useToken";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { userInfoState } from "../../recoil/userAtoms";
import BaseModal from "./BaseModal";
import BaseScript from "./BaseScript";
import Seo from "./Seo";

config.autoAddCss = false;
const PUBLIC_ROUTES = ["/login", "/register", "/checkingServer"];

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  const router = useRouter();
  const token = useToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { data: session } = useSession();

  const isGuest = session?.user.name === "guest";

  const [isErrorModal, setIsErrorModal] = useState(false);

  const setUserInfo = useSetRecoilState(userInfoState);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    router.asPath.startsWith(route)
  );

  const isCondition = !isPublicRoute && isGuest === false && Boolean(token);

  //접속 권한 확인
  useUserInfoQuery({
    enabled: isCondition,
    onSuccess(data) {
      //유저 데이터 없음
      if (data === null || !data.registerDate) {
        if (router.query.status === "login") navigateTo(`/register/location`);
        else navigateTo("/login/?status=noMember");
        return;
      }
      //유저 데이터 에러
      if (session && data._id !== session.id) setIsErrorModal(true);

      setUserInfo(data);
    },
    onError() {
      navigateTo("/checkingServer");
    },
  });

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Seo title="ABOUT" />

      {token && (
        <>
          <div id="root-modal">{children}</div>
          <BaseModal
            isGuest={isGuest}
            isError={isErrorModal}
            setIsError={setIsErrorModal}
          />
        </>
      )}
      <BaseScript />
    </>
  );
}

export default Layout;
