import { faBalanceScale, faBars } from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Image from "next/image";
import { motion } from "framer-motion";
import StudyRuleModal from "../../../modals/info/StudyRuleModal";
import ModalPortal from "../../../components/ModalPortal";
import Drawer from "../../../components/Layout/Drawer";
import { useRecoilState, useRecoilValue } from "recoil";
import { isNoticeAlertState } from "../../../recoil/utilityAtoms";
import { NOTICE_ALERT } from "../../../constants/localStorage";

export default function Header() {
  const [isNoticeAlert, setIsNoticeAlert] = useRecoilState(isNoticeAlertState);
  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const router = useRouter();

  const onClickedNotice = () => {
    router.push(`/notice`);
    if (isNoticeAlert) {
      localStorage.setItem(NOTICE_ALERT, "read");
      setIsNoticeAlert(false);
    }
  };
  return (
    <>
      <Layout>
        <div>
          <DrawerWrapper onClick={() => setIsDrawer(true)}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </DrawerWrapper>
          <LogoWrapper>
            {/* <IconAbout /> SVG로 했을 때 모바일에서 안 보이는 문제 발생*/}
            <Image src={`/aboutSm.png`} width={74} height={42} alt="aboutSm" />
          </LogoWrapper>
        </div>
        <Nav>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faBalanceScale}
              size="lg"
              onClick={() => setIsRuleModal(true)}
            />
          </IconWrapper>

          <IconWrapper>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              onClick={onClickedNotice}
            />
            {isNoticeAlert && <IconAlert />}
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              onClick={() => router.push(`/user`)}
            />
          </IconWrapper>
        </Nav>
      </Layout>
      <>
        {isRuleModal && (
          <ModalPortal setIsModal={setIsRuleModal}>
            <StudyRuleModal setIsModal={setIsRuleModal} />
          </ModalPortal>
        )}
        {isDrawer && (
          <ModalPortal setIsModal={setIsDrawer}>
            <Drawer isDrawer={isDrawer} setIsDrawer={setIsDrawer} />
          </ModalPortal>
        )}
      </>
    </>
  );
}

const Layout = styled.header`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  color: var(--font-h2);
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;

const DrawerWrapper = styled.div`
  margin-right: 12px;
`;

const LogoWrapper = styled(motion.div)`
  padding-top: 14px;
  padding-bottom: 3px;
  margin-left: 4px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  > div:nth-child(2) {
    position: relative;
  }
`;

const IconWrapper = styled.div`
  margin-left: 20px;
  display: flex;
`;

const IconAlert = styled.div`
  position: absolute;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-red);
`;
