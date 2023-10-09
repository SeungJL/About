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

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
config.autoAddCss = false;
const FREE_ROUTERS = ["/login", "/register", "/checkingServer"];

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

  const isFreeRoute = !FREE_ROUTERS.some((route) =>
    router.asPath.startsWith(route)
  );
  const isCondition = !!session && !isGuest && isFreeRoute && Boolean(token);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  //조건이 true인 경우 동아리원이 맞는지 권한 여부 체크
  useUserInfoQuery({
    enabled: isCondition,
    onSuccess(data) {
      //다른 곳에서 query 호출이 중복되는 경우 방지
      if (!isCondition) return;
      //정상적이지 않은 유저테이블 생성에 대한 오류 방지
      if ((data === null && !isGuest) || data?.birth === "") {
        if (router.query.status === "login") navigateTo(`/register/location`);
        else navigateTo("/login/?status=noMember");
        return;
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
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}
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
