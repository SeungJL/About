import {
  faArrowUpFromBracket,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function StudySpaceHeader({ title }) {
  const router = useRouter();

  return (
    <Layout>
      <div onClick={() => router.push(`/about`)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <Title>{title}</Title>
      </div>
      <div>
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-h2);
  padding-right: 20px;
`;

const Title = styled.span`
  color: var(--font-h1);
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

export default StudySpaceHeader;
