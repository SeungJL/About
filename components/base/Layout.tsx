/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useState } from "react";
import styled from "styled-components";
import { useToken } from "../../hooks/token/useToken";
import { useUserInfoQuery } from "../../hooks/user/queries";
import BaseModal from "./BaseModal";
import Seo from "./Seo";

const NEXT_PUBLIC_NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
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

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    router.asPath.startsWith(route)
  );

  const isCondition = !isPublicRoute && isGuest === false && Boolean(token);

  //접속 권한 확인
  useUserInfoQuery({
    enabled: isCondition,
    onSuccess(data) {
      //다른 곳에서 query 호출이 중복되는 경우 방지
      if (!isCondition) return;
      if (data === null || !data.registerDate) {
        if (router.query.status === "login") navigateTo(`/register/location`);
        else navigateTo("/login/?status=noMember");
        return;
      }
      //유저 데이터 에러
      if (data._id !== session.id) setIsErrorModal(true);
    },
    onError() {
      navigateTo("/checkingServer");
    },
  });

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <LayoutContainer>
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
      <Seo title="ABOUT" />
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      />
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
      <Script
        src="https://kit.fontawesome.com/4071928605.js"
        crossOrigin="anonymous"
      />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  overflow: hidden;
`;

export default Layout;
