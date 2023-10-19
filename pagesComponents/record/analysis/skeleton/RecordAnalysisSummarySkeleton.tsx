import styled from "styled-components";
import Skeleton from "../../../../components/common/masks/skeleton/Skeleton";

function RecordAnalysisSummarySkeleton() {
  return (
    <Layout>
      <Title>요약</Title>
      <Summary>
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <SummaryItem key={idx}>
            <WeekText>
              <Skeleton>temp</Skeleton>
            </WeekText>
            <WeekAttend>
              <Skeleton>temp</Skeleton>
            </WeekAttend>
          </SummaryItem>
        ))}
      </Summary>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-main) 0;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const Summary = styled.div`
  margin-top: var(--margin-sub);
`;

const SummaryItem = styled.div`
  height: 37px;
  display: flex;
  justify-content: space-between;
  padding: var(--padding-md) var(--padding-min);
`;

const WeekText = styled.div`
  height: 20px;
  width: 140px;
  > span:last-child {
    margin-left: var(--margin-min);
    color: var(--font-h4);
  }
`;

const WeekAttend = styled.span`
  font-weight: 600;
  width: 28px;
`;

export default RecordAnalysisSummarySkeleton;
