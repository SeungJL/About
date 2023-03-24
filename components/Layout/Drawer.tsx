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
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { IconAbout, IconAboutBig } from "../../public/icons/Icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
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
      <Title>
        <div onClick={() => setIsDrawer(false)}>
          <IconAboutBig />
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <FontAwesomeIcon icon={faExclamationCircle} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontSize="11px">네비게이션 기능</PopoverHeader>
              <PopoverBody fontSize="11px">
                현재 Home을 제외한 네비게이션은 모두 막아놨습니다. 이후에 추가할
                수 있도록 하겠습니다.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </Title>
      <Main>
        <NavHome
          pageSelected={url === "/about"}
          onClick={() => handleClick("about")}
        >
          <FontAwesomeIcon icon={faHouse} size="xl" />

          <span>홈</span>
        </NavHome>
        <NavLevelItem
          pageSelected={url === "/groupStudy"}
          // onClick={() => handleClick("groupStudy")}
        >
          <FontAwesomeIcon icon={faSchool} size="xl" />

          <span>스터디</span>
        </NavLevelItem>
        <NavLevelItem
          pageSelected={url === "/plaza"}
          // onClick={() => handleClick("plaza")}
        >
          <FontAwesomeIcon icon={faPeopleRoof} size="xl" />

          <span>광장</span>
        </NavLevelItem>
        <NavItem
          pageSelected={url === "/gather"}
          // onClick={() => handleClick("gather")}
        >
          <FontAwesomeIcon icon={faCalendarCheck} size="xl" />

          <span>모임</span>
        </NavItem>
        <NavItem
          pageSelected={url === "/gather"}
          // onClick={() => handleClick("gather")}
        >
          <FontAwesomeIcon icon={faUtensils} size="xl" />

          <span>맛집</span>
        </NavItem>
        <NavLevelItem
          pageSelected={url === "/book"}
          // onClick={() => handleClick("book")}
          style={{ marginLeft: "1px" }}
        >
          <FontAwesomeIcon icon={faBookOpen} size="xl" />

          <span style={{ marginLeft: "14px" }}>책</span>
        </NavLevelItem>
        <NavLevelItem
          pageSelected={url === "/gallery"}
          // onClick={() => handleClick("gallery")}
        >
          <FontAwesomeIcon icon={faUsersViewfinder} size="xl" />
          <span>갤러리</span>
        </NavLevelItem>
        <NavItem
          pageSelected={url === "/plaza"}
          // onClick={() => handleClick("plaza")}
          style={{ marginLeft: "1px" }}
        >
          <FontAwesomeIcon icon={faClipboard} size="xl" />

          <span>기록</span>
        </NavItem>
      </Main>
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

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding-top: 16px;
  padding-left: 6px;
  display: flex;
  justify-content: space-between;
  > div:last-child {
    margin-top: 4px;
    margin-right: 18px;
    color: var(--font-h3);
  }
`;

const Main = styled.main`
  padding: 16px;
  padding-top: 10px;
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
