import {
  faArrowDown,
  faBalanceScale,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  IconArrowBottom,
  IconArrowTop,
  IconBellNotice,
  IconUser,
} from "../../../public/icons/Icons";
import ModalPortal from "../../ModalPortal";
import StudyRuleModal from "../../../modals/info/StudyRuleModal";
import { useRouter } from "next/router";

interface IHeader {
  dayCnt: number;
  setDayCnt: Dispatch<SetStateAction<number>>;
}
export default function AboutHeader({ dayCnt, setDayCnt }: IHeader) {
  const [isRuleModal, setIsRuleModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <Layout>
        <Date>
          <span>{dayjs().format("YYYY년 M월")}</span>
          {dayCnt === 7 && (
            <div onClick={() => setDayCnt(35)}>
              <IconArrowBottom />
            </div>
          )}
        </Date>
        <Nav>
          <FontAwesomeIcon
            icon={faBalanceScale}
            size="lg"
            onClick={() => setIsRuleModal(true)}
          />
          <div />
          <div onClick={() => router.push(`/notice`)}>
            <IconBellNotice />
          </div>
        </Nav>
      </Layout>
      {isRuleModal && (
        <ModalPortal closePortal={setIsRuleModal}>
          <StudyRuleModal setIsModal={setIsRuleModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  padding: 14px 16px 8px 16px;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-family: pretendSemiBold;
    color: #343943;
    font-size: 20px;
    letter-spacing: -4%;
    align-items: center;
    margin-right: 8px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  color: rgb(209, 214, 221);
  > div:first-child {
    margin: 3px;
  }
`;
