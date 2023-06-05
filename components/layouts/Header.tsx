import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function Header({
  title,
  url,
  children,
}: {
  title: string;
  url?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Layout>
      <div
        onClick={!url ? () => router.push(`/about`) : () => router.push(url)}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </div>
      <Title>{title}</Title>
      <Nav>{children}</Nav>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: var(--font-h1);
`;

const Title = styled.span`
  color: var(--font-h1);
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
  > div {
    margin-left: 20px;
  }
`;

export default Header;
