import { Box } from "@chakra-ui/react";
import {
  faBadgeCheck,
  faBell,
  faCircleP,
  faCircleUser,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Slide from "../../../components/layout/PageSlide";
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

function HomeHeader() {
  const searchParams = useSearchParams();
  const newSearchparams = new URLSearchParams(searchParams);
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [modalType, setModalType] = useState<HomeHeaderModalType>(null);

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
      link: !isGuest ? "/user" : null,
      func: isGuest
        ? () => router.replace(`/home?${newSearchparams.toString()}&logout=on`)
        : null,
    },
  ];
  return (
    <>
      <Slide isFixed={true}>
        <Layout>
          <Title>ABOUT</Title>
          <Box className="about_header" fontSize="20px">
            <IconButtonNav iconList={iconBtnArr} />
          </Box>
        </Layout>
      </Slide>
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
  height: var(--header-h);

  font-size: 20px;
  background-color: white;
  padding: 0 var(--gap-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--gray-2);
  border-bottom: var(--border);
  max-width: var(--max-width);
  margin: 0 auto;

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
