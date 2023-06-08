import { faBalanceScale, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import ModalPortal from "../../../components/ModalPortal";
import StudyRuleModal from "../../../modals/info/StudyRuleModal";

import { useRecoilState } from "recoil";
import { isNoticeAlertState } from "../../../recoil/utilityAtoms";

import { useToast } from "@chakra-ui/react";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { useSession } from "next-auth/react";
import { NOTICE_ALERT } from "../../../constants/localStorage";
import PromotionModal from "../../../modals/mainHeader/PromotionModal";
import UserLogoutModal from "../../../modals/user/UserLogoutModal";

export default function AboutHeader() {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [isNoticeAlert, setIsNoticeAlert] = useRecoilState(isNoticeAlertState);
  const [isRule, setIsRule] = useState(false);

  const [isLogout, setIsLogout] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);

  const onClickedNotice = () => {
    router.push(`/notice`);
    if (isNoticeAlert) {
      localStorage.setItem(NOTICE_ALERT, "read");
      setIsNoticeAlert(false);
    }
  };

  const onClickUser = () => {
    // if (isGuest) {
    //   setIsLogout(true);
    //   return;
    // }
    router.push(`/user`);
  };
  return (
    <>
      <Layout>
        <ABOUT>ABOUT</ABOUT>

        <Nav>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faGift}
              size="lg"
              onClick={() => setIsPromotion(true)}
            />
          </IconWrapper>

          <IconWrapper>
            <FontAwesomeIcon
              icon={faBalanceScale}
              size="lg"
              onClick={() => setIsRule(true)}
            />
          </IconWrapper>
          <IconWrapper style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              onClick={onClickedNotice}
            />
            {isNoticeAlert && <IconAlert />}
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faUser} size="xl" onClick={onClickUser} />
          </IconWrapper>
        </Nav>
      </Layout>
      <>
        {isRule && (
          <ModalPortal setIsModal={setIsRule}>
            <StudyRuleModal setIsModal={setIsRule} />
          </ModalPortal>
        )}

        {isLogout && (
          <ModalPortal setIsModal={setIsLogout}>
            <UserLogoutModal setIsModal={setIsLogout} />
          </ModalPortal>
        )}
        {isPromotion && (
          <ModalPortal setIsModal={setIsPromotion}>
            <PromotionModal setIsModal={setIsPromotion} />
          </ModalPortal>
        )}
      </>
    </>
  );
}

const ABOUT = styled.span`
  font-weight: 600;
  font-size: 22px;
  color: var(--font-h1);
`;

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
`;

const IconAlert = styled.div`
  position: absolute;
  right: 1px;
  top: 1px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-red);
`;
