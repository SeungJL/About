import { Box } from "@chakra-ui/react";
import {
  faBadgeCheck,
  faBell,
  faCircleP,
  faCircleUser,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import IconButtonNav, {
  IconButtonNavBtn,
} from "../../../components2/molecules/navs/IconButtonNav";
import DailyCheckModal from "../../../modals/aboutHeader/dailyCheckModal/DailyCheckModal";
import PointSystemsModal from "../../../modals/aboutHeader/pointSystemsModal/PointSystemsModal";
import { AlertIcon } from "../../../styles/icons";
// export type HomeHeaderModalType =
//   | "promotion"
//   | "rabbit"
//   | "rule"
//   | "notice"
//   | "user"
//   | "attendCheck"
//   | "attendCheckWin";

export type HomeHeaderModalType = "dailyCheck" | "pointGuide" | null;
type IconType = "user" | "notice" | HomeHeaderModalType;

function HomeHeader() {
  const [modalType, setModalType] = useState<HomeHeaderModalType>(null);
  const [isRabbitRun, setIsRabbitRun] = useState(false);

  // useEffect(() => {

  //   if (!localStorage.getItem(RABBIT_POP_UP)) setIsRabbitRun(true);
  // }, []);

  const iconBtnArr: IconButtonNavBtn[] = [
    {
      icon: <FontAwesomeIcon icon={faBadgeCheck} color="var(--color-mint)" />,
      func: () => setModalType("dailyCheck"),
    },
    {
      icon: <FontAwesomeIcon icon={faCircleP} />,
      func: () => setModalType("pointGuide"),
    },
    {
      icon: (
        <>
          <FontAwesomeIcon icon={faBell} />
          <Alert />
        </>
      ),
      link: "/notice",
    },
    {
      icon: <FontAwesomeIcon icon={faCircleUser} />,
      link: "/user",
    },
  ];
  return (
    <>
      <Layout>
        <Title>ABOUT</Title>
        <Box className="about_header" fontSize="20px">
          <IconButtonNav iconList={iconBtnArr} />
        </Box>
      </Layout>
      {modalType === "pointGuide" && (
        <PointSystemsModal setIsModal={() => setModalType(null)} />
      )}
      {modalType === "dailyCheck" && (
        <DailyCheckModal setIsModal={() => setModalType(null)} />
      )}
    </>
  );
}

const Layout = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--header-h);
  z-index: 10;
  font-size: 20px;
  background-color: white;
  padding: 0 var(--gap-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--gray-2);
  border-bottom: var(--border);
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.span`
  font-weight: 800;
  color: var(--gray-1);
`;

const Alert = styled(AlertIcon)`
  position: absolute;
  right: 14px;
  bottom: 24px;
`;

export default HomeHeader;
