import { faRightLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function RecordDetailOverviewSkeleton() {
  return (
    <Layout>
      <Title></Title>
      <Value></Value>
      <ChangeBtn>
        <span>전환</span>
        <FontAwesomeIcon icon={faRightLeft} size="xs" />
      </ChangeBtn>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 var(--padding-main);
  height: 140px;
  background-color: var(--color-mint);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.8;
`;

const Title = styled.div`
  height: 25px;
  width: 60px;
  margin-bottom: var(--margin-min);
`;

const Value = styled.div`
  width: 80px;
  height: 32px;
  font-size: 20px;
  font-weight: 600;
`;

const ChangeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--margin-md);
  background-color: #08ad9f;
  width: 58px;
  height: 28px;
  font-size: 13px;
  border-radius: var(--border-radius-main);
  > span:first-child {
    margin-right: var(--margin-md);
  }
`;

export default RecordDetailOverviewSkeleton;
