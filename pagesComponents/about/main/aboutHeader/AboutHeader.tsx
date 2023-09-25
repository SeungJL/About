import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  NOTICE_ALERT,
  RABBIT_RUN,
} from "../../../../constants/keys/localStorage";
import { useFailToast } from "../../../../hooks/CustomToast";
import { attendCheckWinGiftState } from "../../../../recoil/renderTriggerAtoms";
import { isGuestState } from "../../../../recoil/userAtoms";
import { NOTICE_ARR } from "../../../../storage/notice";
import AboutHeaderIcons from "./AboutHeaderIcons";
import AboutHeaderModals from "./AboutHeaderModals";

export type AboutHeaderIconType =
  | "promotion"
  | "rabbit"
  | "rule"
  | "notice"
  | "user"
  | "attendCheck"
  | "attendCheckWin";

function AboutHeader() {
  const router = useRouter();
  const failToast = useFailToast();

  const isGuest = useRecoilValue(isGuestState);
  const attendCheckWinGift = useRecoilValue(attendCheckWinGiftState);

  const [iconType, setIconType] = useState<AboutHeaderIconType>(null);
  const [isRabbitRun, setIsRabbitRun] = useState(false);

  useEffect(() => {
    if (iconType === "promotion" && isGuest) {
      failToast("guest");
      return;
    }
    if (iconType === "notice")
      localStorage.setItem(NOTICE_ALERT, String(NOTICE_ARR.length));
    if (iconType === "rabbit") setIsRabbitRun(false);
    if (
      (["notice", "user", "promotion"] as AboutHeaderIconType[]).includes(
        iconType
      )
    )
      router.push(iconType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconType, isGuest, router]);

  useEffect(() => {
    if (!!attendCheckWinGift) setIconType("attendCheckWin");
    if (!localStorage.getItem(RABBIT_RUN)) setIsRabbitRun(true);
  }, [attendCheckWinGift]);

  return (
    <>
      <Layout>
        <ABOUT>ABOUT</ABOUT>
        <AboutHeaderIcons setIconType={setIconType} isRabbitRun={isRabbitRun} />
        <AboutHeaderModals iconType={iconType} setIconType={setIconType} />
      </Layout>
    </>
  );
}

const ABOUT = styled.span`
  font-weight: 600;
  font-size: 22px;
  color: var(--font-h1);
`;

const Layout = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: var(--padding-main);
  padding-right: 6px;
  color: var(--font-h2);
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;

export default AboutHeader;
