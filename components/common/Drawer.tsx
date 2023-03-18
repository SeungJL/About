import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
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
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function Drawer({
  isDrawer,
  setIsDrawer,
}: {
  setIsDrawer: Dispatch<SetStateAction<boolean>>;
  isDrawer: boolean;
}) {
  const router = useRouter();
  const url = router?.pathname;

  const handleClick = (link) => {
    const src = `/${link}`;
    if (url === src) {
      setIsDrawer(false);
      return;
    }
    router.push(src);
  };

  return (
    <Layout
      initial={{ x: "-100%" }}
      animate={{ x: isDrawer ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Title>About</Title>
        <div onClick={() => setIsDrawer(false)}>
          <FontAwesomeIcon icon={faX} size="lg" />
        </div>
      </Header>
      <NavItem
        pageSelected={url === "/about"}
        onClick={() => handleClick("about")}
      >
        <FontAwesomeIcon icon={faHouse} size="xl" />

        <span>홈</span>
      </NavItem>
      <NavItem pageSelected={url === "/study"}>
        <FontAwesomeIcon icon={faBook} size="xl" />

        <span>스터디</span>
      </NavItem>
      <NavItem pageSelected={url === "/gather"}>
        <FontAwesomeIcon icon={faCalendarCheck} size="xl" />

        <span>모임</span>
      </NavItem>
      <NavItem pageSelected={url === "/plaza"}>
        <FontAwesomeIcon icon={faClipboard} size="xl" />

        <span>광장</span>
      </NavItem>
      <NavItem
        pageSelected={url === "/user"}
        onClick={() => handleClick("user")}
      >
        <FontAwesomeIcon icon={faUser} size="xl" />
        <span>마이페이지</span>
      </NavItem>
    </Layout>
  );
}

const Layout = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: white;
  z-index: 10;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 28px;
  color: #343943;
  margin-bottom: 20px;
`;
const NavItem = styled.div<{ pageSelected: boolean }>`
  color: ${(props) => (props.pageSelected ? "#343943d1" : "#565b679f")};
  margin-bottom: 30px;
  > span {
    margin-left: 14px;
    font-size: 15px;
  }
`;

export default Drawer;
