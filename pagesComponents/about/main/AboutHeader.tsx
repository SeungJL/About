import {
  faBadgeCheck,
  faBalanceScale,
  faBell,
  faGift,
  faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../components/common/ModalPortal";
import PromotionModal from "../../../modals/aboutHeader/promotionModal/PromotionModal";
import StudyRuleModal from "../../../modals/aboutHeader/studyRuleModal/StudyRuleModal";
import { isNoticeAlertState } from "../../../recoil/renderTriggerAtoms";

function AboutHeader() {
  const router = useRouter();
  const isNoticeAlert = useRecoilValue(isNoticeAlertState);

  const [isRule, setIsRule] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isAttendCheck, setIsAttendCheck] = useState(false);

  const onClickIcon = (type: string) => {
    if (type === "promotion") setIsPromotion(true);
    if (type === "rule") setIsRule(true);
    if (type === "notice" || type === "user") router.push(type);
    if (type === "attendCheck") {
    }
  };

  return (
    <>
      <Layout>
        <ABOUT>ABOUT</ABOUT>
        <Nav>
          {/* <IconWrapper>
            <FontAwesomeIcon
              icon={faBadgeCheck}
              size="lg"
              color="var(--color-mint)"
              onClick={() => onClickIcon("")}
              bounce
            />
          </IconWrapper> */}
          <IconWrapper>
            <FontAwesomeIcon
              icon={faGift}
              size="lg"
              onClick={() => onClickIcon("promotion")}
            />
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faBalanceScale}
              size="lg"
              onClick={() => onClickIcon("rule")}
            />
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              onClick={() => onClickIcon("notice")}
            />
            {isNoticeAlert && <IconAlert />}
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              onClick={() => onClickIcon("user")}
            />
          </IconWrapper>
        </Nav>
      </Layout>
      <>
        {isRule && (
          <ModalPortal setIsModal={setIsRule}>
            <StudyRuleModal setIsModal={setIsRule} />
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
  padding: var(--padding-main);
  color: var(--font-h2);
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  > div:nth-child(3) {
    position: relative;
  }
`;

const IconWrapper = styled.div`
  margin-left: var(--margin-max);
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

export default AboutHeader;
