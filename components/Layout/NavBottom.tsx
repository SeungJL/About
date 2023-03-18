import {
  faBook,
  faHouse,
  faUsers,
  faCalendarCheck,
  faClipboard,
  faClipboardCheck,
  faClipboardUser,
  faAngleDoubleRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

export default function NavBottom() {
  const router = useRouter();
  const url = router?.pathname;

  return (
    <Layout>
      <NavItem
        pageSelected={url === "/about"}
        onClick={() => router.push(`/about`)}
      >
        <FontAwesomeIcon icon={faHouse} size="xl" />
        <br />
        <span>홈</span>
      </NavItem>
      <NavItem pageSelected={url === "/study"}>
        <FontAwesomeIcon icon={faBook} size="xl" />
        <br />
        <span>스터디</span>
      </NavItem>
      <NavItem pageSelected={url === "/gather"}>
        <FontAwesomeIcon icon={faCalendarCheck} size="xl" />
        <br />
        <span>모임</span>
      </NavItem>
      <NavItem pageSelected={url === "/plaza"}>
        <FontAwesomeIcon icon={faClipboard} size="xl" />
        <br />
        <span>광장</span>
      </NavItem>
      <NavItem
        pageSelected={url === "/user"}
        onClick={() => router.push(`/user`)}
      >
        <FontAwesomeIcon icon={faUser} size="xl" />
        <br />
        <span>마이페이지</span>
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
  background-color: white;
  z-index: 10;
`;

const NavItem = styled.div<{ pageSelected: boolean }>`
  flex: 1;
  text-align: center;
  color: ${(props) => (props.pageSelected ? "#565b67" : "#d1d6dd")};
  > span {
    font-size: 11px;
  }
`;
