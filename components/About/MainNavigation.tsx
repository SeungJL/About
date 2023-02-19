import styled from "styled-components";

import {
  faBookOpen,
  faCalendarCheck,
  faUser,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSetRecoilState } from "recoil";
import { isShowNotCompletedState } from "../../recoil/atoms";
import Link from "next/link";
import CircleAlert from "../icon/CircleAlert";

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
    icon: <FontAwesomeIcon icon={faCalendarCheck} size="2xl" />,
    name: "gather",
    use: false,
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} size="2xl" />,
    name: "members",
    use: true,
  },

  {
    icon: <FontAwesomeIcon icon={faBookOpen} size="2xl" />,
    name: "book",
    use: true,
  },
  { icon: <FontAwesomeIcon icon={faUtensils} size="2xl" />, name: "food" },
  {
    icon: <FontAwesomeIcon icon={faUser} size="2xl" />,
    name: "soon1",
    use: false,
  },
  {
    icon: <FontAwesomeIcon icon={faUser} size="2xl" />,
    name: "soon2",
    use: false,
  },
];

function MainNavigation() {
  const setIsNotCompleted = useSetRecoilState(isShowNotCompletedState);

  return (
    <MainNavLayout>
      {navigationItems.map((item) => (
        <NavigationItem key={item.name}>
          {item.use === true ? (
            <>
              <Link href={item.name}>
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
