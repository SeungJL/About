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
}

const Header = ({ title, url, children, isPrev }: IHeader) => {
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
    <Layout>
      <div onClick={handleClick}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </div>
      <Title>{title}</Title>
      <Nav>{children}</Nav>
    </Layout>
  );
};

const Layout = styled.div`
  height: 46px;
  padding: 0 var(--padding-main);
  display: flex;
  align-items: center;
  color: var(--font-h1);
`;

const Title = styled.span`
  color: var(--font-h1);
  font-size: 17px;
  font-weight: 600;
  margin-left: var(--margin-main);
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
