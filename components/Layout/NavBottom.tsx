import {
  faBook,
  faHouse,
  faUsers,
  faCalendarCheck,
  faClipboard,
  faClipboardCheck,
  faClipboardUser,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

export default function NavBottom() {
  return (
    <Layout>
      <NavItem pageSelected={true}>
        <FontAwesomeIcon icon={faHouse} size="xl" />
        <br />
        <span>홈</span>
      </NavItem>
      <NavItem pageSelected={false}>
        <FontAwesomeIcon icon={faBook} size="xl" />
        <br />
        <span>스터디</span>
      </NavItem>
      <NavItem pageSelected={false}>
        <FontAwesomeIcon icon={faCalendarCheck} size="xl" />
        <br />
        <span>모임</span>
      </NavItem>
      <NavItem pageSelected={false}>
        <FontAwesomeIcon icon={faClipboard} size="xl" />
        <br />
        <span>광장</span>
      </NavItem>
      <NavItem pageSelected={false}>
        <FontAwesomeIcon icon={faAngleDoubleRight} size="xl" />
        <br />
        <span>기타</span>
      </NavItem>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #e3e6eb;
`;

const NavItem = styled.div<{ pageSelected: boolean }>`
  flex: 1;
  text-align: center;
  color: ${(props) => (props.pageSelected ? "#565b67" : "#d1d6dd")};
  > span {
    font-size: 11px;
  }
`;
