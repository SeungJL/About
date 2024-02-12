"use client";

import {
  faHandshake as faDefaultHandShake,
  faHouse as faDefaultHouse,
  faPlusCircle,
  faRankingStar as faDefaultRankingStar,
  faUsersRectangle as faDefaultUsersRectangle,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faHandshake,
  faHouse,
  faRankingStar,
  faUsersRectangle,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styled from "styled-components";

interface INavButtonProps {
  url: string;
  defaultIcon: React.ReactNode;
  text?: string;
  activeIcon?: React.ReactNode;
}

interface INavButton extends INavButtonProps {
  active: boolean;
}

export default function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  console.log(pathname, searchParams);
  return (
    <Nav>
      {navItems.map((item, idx) => (
        <NavButton
          text={item.text}
          key={idx}
          url={item.url + `?${newSearchParams.toString()}`}
          activeIcon={item.activeIcon}
          defaultIcon={item.defaultIcon}
          active={pathname === item.url}
        />
      ))}
    </Nav>
  );
}

const NavButton = ({
  text,
  url,
  activeIcon,
  defaultIcon,
  active,
}: INavButton) => (
  <NavLink href={url} replace={true} scroll={false} active={active.toString()}>
    {active ? activeIcon || defaultIcon : defaultIcon}
    <NavText>{text}</NavText>
  </NavLink>
);

const navItems: INavButtonProps[] = [
  {
    activeIcon: <FontAwesomeIcon icon={faHouse} size="xl" />,
    defaultIcon: <FontAwesomeIcon icon={faDefaultHouse} size="xl" />,
    text: "홈",
    url: "/home",
  },
  {
    activeIcon: <FontAwesomeIcon icon={faRankingStar} size="xl" />,
    defaultIcon: <FontAwesomeIcon icon={faDefaultRankingStar} size="xl" />,
    text: "랭킹",
    url: "/ranking",
  },
  {
    defaultIcon: <FontAwesomeIcon icon={faPlusCircle} size="xl" />,
    url: "/",
  },
  {
    activeIcon: <FontAwesomeIcon icon={faHandshake} size="xl" />,
    defaultIcon: <FontAwesomeIcon icon={faDefaultHandShake} size="xl" />,
    text: "모임",
    url: "/gather",
  },
  {
    activeIcon: <FontAwesomeIcon icon={faUsersRectangle} size="xl" />,
    defaultIcon: <FontAwesomeIcon icon={faDefaultUsersRectangle} size="xl" />,
    text: "소그룹",
    url: "/group",
  },
];

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: even;
  position: fixed;
  bottom: 0;
  height: 64px; /* Adjusted from the inline style */
  background-color: white;
  z-index: 10;
  box-shadow: var(--box-shadow-top-b);
`;

const NavLink = styled<{ active: "true" | "false" }>(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ active }: { active: "true" | "false" }) =>
    active === "true" ? "text-gray-2" : "text-gray-4"};
`;

const NavText = styled.div`
  margin-top: 8px; /* 2rem if you're using rem */
  font-size: 12px; /* Adjusted for text-xs */
`;
