import {
  faArrowDown,
  faBalanceScale,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IconBellNotice } from "../../../public/icons/Icons";
import ModalPortal from "../../ModalPortal";
import StudyRuleModal from "../../../modals/info/StudyRuleModal";
import Drawer from "../../layout/Drawer";
import { Modal } from "@chakra-ui/react";

export default function AboutHeader() {
  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const router = useRouter();
  return (
    <>
      <Layout>
        <div onClick={() => setIsDrawer(true)}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
        <Nav>
          <div>
            <FontAwesomeIcon
              icon={faBalanceScale}
              size="lg"
              onClick={() => setIsRuleModal(true)}
            />
          </div>

          <div>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              onClick={() => router.push(`/notice`)}
            />
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
  color: var(--font-h1);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  > div {
    margin-left: 20px;
  }
`;
