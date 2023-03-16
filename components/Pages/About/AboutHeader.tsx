import { faArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  IconArrowBottom,
  IconBellNotice,
  IconUser,
} from "../../../public/icons/Icons";

interface IHeader {
  setDayCnt: Dispatch<SetStateAction<number>>;
}
export default function AboutHeader({ setDayCnt }: IHeader) {
  return (
    <Layout>
      <Date>
        <span>{dayjs().format("YYYY년 M월")}</span>
        <div onClick={() => setDayCnt(35)}>
          <IconArrowBottom />
        </div>
      </Date>
      <Nav>
        <IconBellNotice />
        <div />
        <IconUser />
      </Nav>
    </Layout>
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
  > div {
    margin: 3px;
  }
`;
