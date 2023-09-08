import {
  faBadgeCheck,
  faBalanceScale,
  faBell,
  faGift,
  faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { faRabbitRunning } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import ModalPortal from "../../../components/common/ModalPortal";
import {
  ATTEND_CHECK,
  LIKE_HEART_CNT,
  RABBIT_RUN,
} from "../../../constants/localStorage";
import { useFailToast } from "../../../hooks/CustomToast";
import { useInteractionLikeQuery } from "../../../hooks/interaction/queries";
import AttendCheckModal from "../../../modals/aboutHeader/AttendCheckModal";
import AttendCheckWinModal from "../../../modals/aboutHeader/AttendCheckWinModal";
import PromotionModal from "../../../modals/aboutHeader/promotionModal/PromotionModal";
import RegularGatherModal from "../../../modals/aboutHeader/RegularGatherModal";
import StudyRuleModal from "../../../modals/aboutHeader/studyRuleModal/StudyRuleModal";
import {
  attendCheckWinGiftState,
  isNoticeAlertState,
} from "../../../recoil/renderTriggerAtoms";
import { isGuestState } from "../../../recoil/userAtoms";
import { AlertIcon } from "../../../styles/icons";

function AboutHeader() {
  const router = useRouter();
  const failToast = useFailToast();

  const [isNoticeAlert, setIsNoticeAlert] = useRecoilState(isNoticeAlertState);

  const isGuest = useRecoilValue(isGuestState);
  const attendCheckWinGift = useRecoilValue(attendCheckWinGiftState);

  const [isRabbitRun, setIsRabbitRun] = useState(false);
  const [isRabbit, setIsRabbit] = useState(false);
  const [isRule, setIsRule] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isAttendCheck, setIsAttendCheck] = useState(false);
  const [isAttendCheckGift, setIsAttendCheckGift] = useState(false);

  useInteractionLikeQuery({
    onSuccess(data) {
      const likeCnt = localStorage.getItem(LIKE_HEART_CNT);
      if (+likeCnt !== data?.length) setIsNoticeAlert(true);
    },
  });

  useEffect(() => {
    if (!!attendCheckWinGift) setIsAttendCheckGift(true);
    else setIsAttendCheck(false);
    if (!localStorage.getItem(RABBIT_RUN)) 
      setIsRabbitRun(true);
  }, [attendCheckWinGift]);

  const onClickIcon = (type: string) => {
    if (type === "promotion" && isGuest) {
      failToast("guest");
      return;
    }
    if (type === "rabbit") setIsRabbit(true);
    if (type === "rule") setIsRule(true);
    if (type === "notice" || type === "user" || type === "promotion")
      router.push(type);
    if (type === "attendCheck") {
      setIsAttendCheck(true);
    }
  };

  const hasAttend = localStorage.getItem(ATTEND_CHECK);

  return (
    <>
      <Layout>
        <ABOUT>ABOUT</ABOUT>
        <Nav>
          {!hasAttend && (
            <IconWrapper>
              <FontAwesomeIcon
                icon={faBadgeCheck}
                size="lg"
                color="var(--color-mint)"
                onClick={() => onClickIcon("attendCheck")}
                bounce
              />
            </IconWrapper>
          )}
          <IconWrapper>
            <FontAwesomeIcon
              icon={faRabbitRunning}
              size="lg"
              color="var(--color-red)"
              bounce={!!hasAttend && isRabbitRun}
              onClick={() => onClickIcon("rabbit")}
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
              icon={faGift}
              size="lg"
              onClick={() => onClickIcon("promotion")}
            />
          </IconWrapper>
          <NoticeWrapper>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              onClick={() => onClickIcon("notice")}
            />
            {isNoticeAlert && <Alert />}
          </NoticeWrapper>
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
        {isAttendCheck && (
          <ModalPortal setIsModal={setIsAttendCheck}>
            <AttendCheckModal setIsModal={setIsAttendCheck} />
          </ModalPortal>
        )}
        {isAttendCheckGift && (
          <ModalPortal setIsModal={setIsAttendCheckGift}>
            <AttendCheckWinModal setIsModal={setIsAttendCheckGift} />
          </ModalPortal>
        )}
        {isRabbit && (
          <ModalPortal setIsModal={setIsRabbit}>
            <RegularGatherModal setIsModal={setIsRabbit} />
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

const Alert = styled(AlertIcon)`
  position: absolute;
  right: 1px;
  top: 1px;
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
`;

const IconWrapper = styled.div`
  margin-left: var(--margin-max);
`;
const NoticeWrapper = styled(IconWrapper)`
  position: relative;
`;

export default AboutHeader;
