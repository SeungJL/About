import {
  faBookOpen,
  faCalendarCheck,
  faUser,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";

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
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} size="2xl" />,
    name: "members",
  },

  {
    icon: <FontAwesomeIcon icon={faBookOpen} size="2xl" />,
    name: "book",
  },
  { icon: <FontAwesomeIcon icon={faUtensils} size="2xl" />, name: "food" },
  {
    icon: <FontAwesomeIcon icon={faUser} size="2xl" />,
    name: "soon1",
  },
  {
    icon: <FontAwesomeIcon icon={faUser} size="2xl" />,
    name: "soon2",
  },
];

function MainNavigation() {
  return (
    <MainNavLayout>
      {navigationItems.map((item) => (
        <Link href={`/${item.name}`} key={item.name}>
          <NavigationItem>
            <div>
              <IconBox>{item.icon}</IconBox>
            </div>
            <div>{item.name}</div>
          </NavigationItem>
        </Link>
      ))}
    </MainNavLayout>
  );
}
export default MainNavigation;
