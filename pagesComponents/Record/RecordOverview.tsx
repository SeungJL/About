import { Button } from "@chakra-ui/react";
import styled from "styled-components";

function RecordOverview() {
  return (
    <Layout>
      <MyRecord>
        <MyRecordItem>
          <div>
            <span>스터디 오픈</span>
            <span>2회</span>
          </div>
          <div>
            <span>참여한 인원</span>
            <span>182명</span>
          </div>
        </MyRecordItem>
        <MyRecordItem>
          <div>
            <span>내 참여 횟수</span>
            <span style={{ color: "var(--color-mint)" }}>4회</span>
          </div>
          <div>
            <span>나의 카운트</span>
            <span style={{ color: "var(--color-mint)" }}>4회</span>
          </div>
        </MyRecordItem>
      </MyRecord>
      <Button color="var(--font-h2)">분석</Button>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;
const MyRecord = styled.div`
  display: flex;
  height: 100%;
`;

const MyRecordItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 120px;
  margin-bottom: 6px;

  margin-right: 8px;
  > div {
    > span:first-child {
      margin-right: 6px;
      color: var(--font-h3);
      font-size: 13px;
    }
    > span:last-child {
      font-weight: 700;
      font-size: 15px;
      color: var(--font-h2);
    }
  }
`;

const AnalyzeBtn = styled.button``;

export default RecordOverview;
