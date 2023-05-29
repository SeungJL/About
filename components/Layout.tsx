/* eslint-disable @next/next/no-before-interactive-script-outside-document */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from "react";
import Router from "next/router";

import { useRecoilValue } from "recoil";

import styled from "styled-components";
import Script from "next/script";
import { MainLoading } from "./ui/Loading";
import { useUserInfoQuery } from "../hooks/user/queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
const NEXT_PUBLIC_NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const isAccessPermission =
    session?.user.name !== "guest" &&
    router.pathname.slice(0, 6) !== "/login" &&
    router.pathname.slice(0, 9) !== "/register";
  console.log(router);
  useUserInfoQuery({
    enabled: isAccessPermission,
    onSuccess(data) {
      if (!data?.birth && isAccessPermission) router.push("/register/location");
    },
    onError() {
      if (!session) router.push("/login");
      else router.push("/register/location");
    },
  });

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <LayoutContainer>
      {loading ? (
        <MainLoading />
      ) : (
        <>
          <div id="root-modal">{children}</div>

          <Script
            strategy="beforeInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NEXT_PUBLIC_NAVER_CLIENT_ID}`}
          />
          <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
        </>
      )}
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  color: var(--font-h1);
  background-color: var(--font-h8);
`;

export default Layout;
