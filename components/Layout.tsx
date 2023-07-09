/* eslint-disable @next/next/no-before-interactive-script-outside-document */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from "react";

import { Button } from "@chakra-ui/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Script from "next/script";
import styled from "styled-components";
import { useToken } from "../hooks/token/useToken";
import { useUserInfoQuery } from "../hooks/user/queries";
import { MainLoading } from "./common/MainLoading";
const NEXT_PUBLIC_NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

config.autoAddCss = false;

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  const token = useToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isServer, setIsServer] = useState(false);
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const isAccessPermission =
    session?.user.name !== "guest" &&
    router.pathname.slice(0, 6) !== "/login" &&
    router.pathname.slice(0, 9) !== "/register" &&
    router.asPath !== "/checkingServer";

  useUserInfoQuery({
    enabled: isAccessPermission && Boolean(token),
    onSuccess(data) {
      if (!data?.birth && isAccessPermission) router.push("/register/location");
    },
    onError() {
      if (!session) router.push("/login");
      else router.push("/checkingServer");
      // else router.push("/register/location");
    },
  });

  // useEffect(() => {
  //   const start = () => {
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     setLoading(false);
  //   };

  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);

  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);
  return (
    <LayoutContainer>
      {loading ? (
        <MainLoading />
      ) : (
        token && (
          <>
            <div id="root-modal">{children}</div>
            {isGuest && (
              <GuestNav>
                <span>현재 게스트 로그인을 이용중입니다.</span>
                <Button
                  backgroundColor="var(--color-red)"
                  color="white"
                  size="sm"
                  onClick={() => signOut()}
                >
                  로그아웃
                </Button>
              </GuestNav>
            )}
          </>
        )
      )}
      <Script
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      />
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  color: var(--font-h1);
  background-color: var(--font-h8);
  min-height: 645px;
`;

const GuestNav = styled.nav`
  position: fixed;
  bottom: 0;

  height: 70px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  > span:first-child {
    color: var(--color-red);
    font-weight: 600;
    margin-right: 8px;
  }
`;

export default Layout;
