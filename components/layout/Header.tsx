import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { DEFAULT_BACK_URL } from "../../constants/system";
import { prevPageUrlState } from "../../recoil/previousAtoms";

interface IHeader {
  title: string;
  url?: string | "back";
  isPrev?: boolean;
  children?: React.ReactNode;
  isNoLine?: boolean;
}

const Header = ({ title, url, children, isPrev, isNoLine }: IHeader) => {
  const router = useRouter();

  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);

  const handleClick = () => {
    if (isPrev) setPrevPageUrl(null);

    if (url) {
      if (url === "back") router.back();
      else router.push(`${url}`);
    } else router.push(DEFAULT_BACK_URL);
  };

  return (
    <Layout isNoLine={isNoLine}>
      <IconWrapper onClick={handleClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </IconWrapper>
      <Title>{title}</Title>
      <Nav>{children}</Nav>
    </Layout>
  );
};

const Layout = styled.div<{ isNoLine: boolean }>`
  background-color: white;
  height: 52px;
  padding-right: var(--padding-main);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: var(--font-h1);
  border-bottom: ${(props) => !props.isNoLine && "1px solid var(--font-h56)"};
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 var(--padding-main);
`;

const Title = styled.span`
  color: var(--font-h1);

  font-weight: 600;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
  > div {
    margin-left: var(--margin-max);
  }
`;

export default Header;
