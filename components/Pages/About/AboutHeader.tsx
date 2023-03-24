import {
  faArrowDown,
  faBalanceScale,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IconAbout, IconBellNotice } from "../../../public/icons/Icons";
import ModalPortal from "../../ModalPortal";
import StudyRuleModal from "../../../modals/info/StudyRuleModal";
import Drawer from "../../layout/Drawer";
import { Modal } from "@chakra-ui/react";
import { isatty } from "tty";

export default function AboutHeader() {
  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isAlert, setIsAlert] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("notice")) setIsAlert(false);
  }, []);

  const onClickedNotice = () => {
    router.push(`/notice`);
    if (isAlert) localStorage.setItem("notice", "read");
  };
  return (
    <>
      <Layout>
        <div>
          <div onClick={() => setIsDrawer(true)}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </div>
          <div>
            <IconAbout />
          </div>
        </div>
        <Nav>
          <div>
            <FontAwesomeIcon
              icon={faBalanceScale}
              size="lg"
              onClick={() => setIsRuleModal(true)}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              onClick={onClickedNotice}
            />
            {isAlert && <IconAlert />}
          </div>
          <div>
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              onClick={() => router.push(`/user`)}
            />
          </div>
        </Nav>
      </Layout>
      {isRuleModal && (
        <ModalPortal closePortal={setIsRuleModal}>
          <StudyRuleModal setIsModal={setIsRuleModal} />
        </ModalPortal>
      )}
      {isDrawer && (
        <ModalPortal closePortal={setIsDrawer}>
          <Drawer isDrawer={isDrawer} setIsDrawer={setIsDrawer} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: var(--font-h2);
  > div:first-child {
    display: flex;
    align-items: center;
    > div:first-child {
      margin-right: 12px;
    }
    > div:last-child {
      padding-top: 14px;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  > div {
    margin-left: 20px;
    display: flex;
  }
`;

const IconAlert = styled.div`
  position: absolute;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-red);
`;
