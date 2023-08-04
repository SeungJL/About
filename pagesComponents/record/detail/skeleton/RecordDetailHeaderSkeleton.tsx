import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function RecordDetailHeaderSkeleton() {
  return (
    <Layout>
      <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      <Title>내 스터디 분석</Title>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 var(--padding-main);
  display: flex;
  align-items: center;
  color: white;
  background-color: var(--color-mint);
`;
const Title = styled.span`
  font-size: 17px;
  font-weight: 600;
  margin-left: var(--margin-main);
`;

export default RecordDetailHeaderSkeleton;
