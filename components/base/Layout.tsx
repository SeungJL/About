/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { USER_INITIAL_INFO } from "../../constants/keys/queryKeys";

import { useToken } from "../../hooks/token/useToken";
import { useUserInfoQuery } from "../../hooks/user/queries";
import {
  isGuestState,
  locationState,
  userAccessUidState,
} from "../../recoil/userAtoms";
import { Location } from "../../types/system";
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

  const setUserAccessUid = useSetRecoilState(userAccessUidState);
  const setLocation = useSetRecoilState(locationState);
  const setIsGuest = useSetRecoilState(isGuestState);

  const [isErrorModal, setIsErrorModal] = useState(false);

  let userInitialInfo;
  if (typeof window !== "undefined") {
    userInitialInfo = localStorage.getItem(USER_INITIAL_INFO);
  }

  useEffect(() => {
    if (isGuest) {
      setLocation("수원");
      setIsGuest(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  useEffect(() => {
    if (userInitialInfo && !isGuest) {
      const info: { uid: string; location: Location } =
        JSON.parse(userInitialInfo);
      setUserAccessUid(info.uid);
      setLocation(info.location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInitialInfo]);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    router.asPath.startsWith(route)
  );
  const isCondition = !isPublicRoute && isGuest === false && Boolean(token);
  //접속 권한 확인
  useUserInfoQuery({
    enabled: isCondition && userInitialInfo === null,
    onSuccess(data) {
      //유저 데이터 없음
      if (data === null || !data.registerDate) {
        if (router.query.status === "login") navigateTo(`/register/location`);
        else navigateTo("/login/?status=noMember");
        return;
      }
      //유저 데이터 에러
      if (session && data._id !== session.id) {
        setIsErrorModal(true);
        return;
      }
      setUserAccessUid(data.uid);
      setLocation(data.location);
      localStorage.setItem(
        USER_INITIAL_INFO,
        JSON.stringify({ uid: data.uid, location: data.location })
      );
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
