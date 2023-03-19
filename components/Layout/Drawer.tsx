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
  faUsersViewfinder,
  faPeopleRoof,
  faBurger,
  faUtensilSpoon,
  faUtensils,
  faPeopleCarryBox,
  faBuildingColumns,
  faGraduationCap,
  faLayerGroup,
  faUserGroup,
  faSchool,
  faBookOpen,
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
        <FontAwesomeIcon
          icon={faX}
          size="lg"
          onClick={() => setIsDrawer(false)}
        />
      </Header>
      <NavHome
        pageSelected={url === "/about"}
        onClick={() => handleClick("about")}
      >
        <FontAwesomeIcon icon={faHouse} size="xl" />

        <span>홈</span>
      </NavHome>
      <NavLevelItem
        pageSelected={url === "/groupStudy"}
        onClick={() => handleClick("groupStudy")}
      >
        <FontAwesomeIcon icon={faSchool} size="xl" />

        <span>스터디</span>
      </NavLevelItem>
      <NavLevelItem
        pageSelected={url === "/plaza"}
        onClick={() => handleClick("plaza")}
      >
        <FontAwesomeIcon icon={faPeopleRoof} size="xl" />

        <span>광장</span>
      </NavLevelItem>
      <NavItem
        pageSelected={url === "/gather"}
        onClick={() => handleClick("gather")}
      >
        <FontAwesomeIcon icon={faCalendarCheck} size="xl" />

        <span>모임</span>
      </NavItem>
      <NavItem
        pageSelected={url === "/gather"}
        onClick={() => handleClick("gather")}
      >
        <FontAwesomeIcon icon={faUtensils} size="xl" />

        <span>맛집</span>
      </NavItem>
      <NavLevelItem
        pageSelected={url === "/book"}
        onClick={() => handleClick("book")}
        style={{ marginLeft: "1px" }}
      >
        <FontAwesomeIcon icon={faBookOpen} size="xl" />

        <span style={{ marginLeft: "14px" }}>책</span>
      </NavLevelItem>
      <NavLevelItem
        pageSelected={url === "/gallery"}
        onClick={() => handleClick("gallery")}
      >
        <FontAwesomeIcon icon={faUsersViewfinder} size="xl" />
        <span>갤러리</span>
      </NavLevelItem>
      <NavItem
        pageSelected={url === "/plaza"}
        onClick={() => handleClick("plaza")}
        style={{ marginLeft: "1px" }}
      >
        <FontAwesomeIcon icon={faClipboard} size="xl" />

        <span>기록</span>
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
  padding: 16px;
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
  color: var(--font-h1);
  margin-bottom: 20px;
  padding-left: 4px;
`;
const NavItem = styled.div<{ pageSelected: boolean }>`
  color: ${(props) => (props.pageSelected ? "var(--font-h1)d1" : "#565b679f")};
  padding-left: 3px;
  margin-bottom: 30px;
  > span {
    margin-left: 14px;
    font-size: 15px;
  }
`;
const NavHome = styled.div<{ pageSelected: boolean }>`
  color: ${(props) => (props.pageSelected ? "var(--font-h1)" : "#565b679f")};
  padding-left: 1px;
  margin-bottom: 30px;
  > span {
    margin-left: 11px;
    font-size: 15px;
  }
`;

const NavLevelItem = styled.div<{ pageSelected: boolean }>`
  color: ${(props) => (props.pageSelected ? "var(--font-h1)" : "#565b679f")};

  margin-bottom: 30px;
  > span {
    margin-left: 8px;
    font-size: 15px;
  }
`;

export default Drawer;
