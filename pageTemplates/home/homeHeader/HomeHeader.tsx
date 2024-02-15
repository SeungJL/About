import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  NOTICE_ALERT,
  RABBIT_POP_UP,
} from "../../../constants/keys/localStorage";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { attendCheckWinGiftState } from "../../../recoil/renderTriggerAtoms";
import { isGuestState } from "../../../recoil/userAtoms";
import { NOTICE_ARR } from "../../../storage/notice";
import HomeHeaderIcons from "./HomeHeaderIcons";
import HomeHeaderModals from "./HomeHeaderModals";

export type HomeHeaderIconType =
  | "promotion"
  | "rabbit"
  | "rule"
  | "notice"
  | "user"
  | "attendCheck"
  | "attendCheckWin";

function HomeHeader() {
  const router = useRouter();
  const failToast = useFailToast();

  const isGuest = useRecoilValue(isGuestState);
  const attendCheckWinGift = useRecoilValue(attendCheckWinGiftState);

  const [iconType, setIconType] = useState<HomeHeaderIconType>(null);
  const [isRabbitRun, setIsRabbitRun] = useState(false);

  useEffect(() => {
    if (iconType === "promotion" && isGuest) {
      failToast("guest");
      return;
    }
    if (iconType === "notice") {
      localStorage.setItem(NOTICE_ALERT, String(NOTICE_ARR.length));
    }
    if (iconType === "rabbit") setIsRabbitRun(false);
    const iconTypeArr = ["notice", "user", "promotion"] as HomeHeaderIconType[];
    if (iconTypeArr.includes(iconType)) router.push(iconType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconType, isGuest, router]);

  useEffect(() => {
    if (!!attendCheckWinGift) setIconType("attendCheckWin");
    if (!localStorage.getItem(RABBIT_POP_UP)) setIsRabbitRun(true);
  }, [attendCheckWinGift]);
  console.log(iconType);
  return (
    <Layout>
      <Title>ABOUT</Title>
      <HomeHeaderIcons setIconType={setIconType} isRabbitRun={isRabbitRun} />
      <HomeHeaderModals iconType={iconType} setIconType={setIconType} />
    </Layout>
  );
}

const Layout = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--header-h);
  z-index: 10;
  font-size: 20px;
  background-color: white;
  padding: 0 var(--gap-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--gray-2);
  border-bottom: var(--border);
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.span`
  font-weight: 800;
  color: var(--gray-1);
`;

export default HomeHeader;
