import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function Header({ title }) {
  const router = useRouter();
  return (
    <Layout>
      <div onClick={() => router.push(`/about`)}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </div>
      <Title>{title}</Title>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: #343943;
`;

const Title = styled.span`
  color: #343943;
  font-size: 20px;
  font-weight: 600;
  margin-left: 16px;
`;

export default Header;
