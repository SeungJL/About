import styled from "styled-components";
import {
  faBookOpen,
  faCalendarCheck,
  faClipboard,
  faCommentDots,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import Link from "next/link";
import CircleAlert from "../icon/CircleAlert";
import { isShowNotCompletedState } from "../../recoil/modalAtoms";

const MainNavLayout = styled.nav`
  height: 54vh;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2%;
  background: RGB(137, 86, 40, 0.1);
  border-radius: 3.5%;
`;

const NavigationItem = styled.div`
  height: 85%;
  > div:first-child {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const IconBox = styled.div`
  background-color: RGB(137, 86, 40, 0.25);
  position: relative;
  width: 63%;
  height: 82%;
  border-radius: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(0, 0, 0, 0.7);
`;

const navigationItems = [
  {
    icon: <FontAwesomeIcon icon={faUsers} size="2xl" />,
    name: "Members",
    use: true,
  },

  {
    icon: <FontAwesomeIcon icon={faBookOpen} size="2xl" />,
    name: "도서",
    use: true,
  },

  {
    icon: <FontAwesomeIcon icon={faCalendarCheck} size="2xl" />,
    name: "모임",
    use: false,
  },
  {
    icon: <FontAwesomeIcon icon={faClipboard} size="2xl" />,
    name: "기록",
    use: false,
  },
  {
    icon: <FontAwesomeIcon icon={faCommentDots} size="2xl" />,
    name: "소통",
    use: false,
  },
  { icon: <FontAwesomeIcon icon={faUtensils} size="2xl" />, name: "맛집" },
];

function MainNavigation() {
  const setIsNotCompleted = useSetRecoilState(isShowNotCompletedState);
  const nameToLink = (name) => {
    if (name === "Members") return "members";
    if (name === "도서") return "book";
    if (name === "모임") return "gather";
    if (name === "기록") return "record";
    if (name === "소통") return "";
  };
  return (
    <MainNavLayout>
      {navigationItems.map((item) => (
        <NavigationItem key={item.name}>
          {item.use === true ? (
            <>
              <Link href={nameToLink(item.name)}>
                <div>
                  <IconBox>
                    {item.icon}
                    <CircleAlert right={-5} bottom={67} color="brown" />
                  </IconBox>
                </div>
              </Link>
              <div>{item.name}</div>
            </>
          ) : (
            <>
              <div onClick={() => setIsNotCompleted(true)}>
                <IconBox>{item.icon}</IconBox>
              </div>
              <div>{item.name}</div>
            </>
          )}
        </NavigationItem>
      ))}
    </MainNavLayout>
  );
}
export default MainNavigation;
