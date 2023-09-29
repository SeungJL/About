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
import ErrorUserInfoPopUp from "../../modals/pop-up/ErrorUserInfoPopUp";
import GuestBottomNav from "../layout/GuestBottomNav";
import ModalPortal from "../modals/ModalPortal";
import Seo from "./Seo";

const NEXT_PUBLIC_NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
config.autoAddCss = false;
interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  const { data: session } = useSession();
  const router = useRouter();
  const token = useToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const isGuest = session?.user.name === "guest";

  const [isErrorModal, setIsErrorModal] = useState(false);

  const PROTECTED_ROUTES = ["/login", "/register", "/checkingServer"];
  const isAccessPermission = !PROTECTED_ROUTES.some((route) =>
    router.asPath.startsWith(route)
  );

  const navigateTo = (path) => {
    router.push(path);
  };

  useUserInfoQuery({
    enabled: !isGuest && isAccessPermission && Boolean(token),
    onSuccess(data) {
      //정상적인 가입 경로가 아닌데도 유저 테이블이 생성되는 경우가 있음
      if ((data === null && !isGuest) || data?.birth === "") {
        if (router.query.status === "login") navigateTo(`/register/location`);
        else navigateTo("/login/?status=noMember");
      }
      if (session && data._id !== session?.id) setIsErrorModal(true);
    },
    onError() {
      if (!session) navigateTo("/login");
      else navigateTo("/checkingServer");
    },
  });

  return (
    <LayoutContainer>
      {token && (
        <>
          <div id="root-modal">{children}</div>
          {isGuest && <GuestBottomNav />}
          {isErrorModal && (
            <ModalPortal setIsModal={() => {}}>
              <ErrorUserInfoPopUp setIsModal={setIsErrorModal} />
            </ModalPortal>
          )}
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
