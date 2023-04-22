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
            <span>9명</span>
          </div>
        </MyRecordItem>
        <MyRecordItem>
          <div>
            <span>나의 카운트</span>
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
  width: 70%;
  height: 100%;
  justify-content: space-between;
`;

const MyRecordItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  align-items: center;
  margin-bottom: 6px;
  > div {
    > span:first-child {
      margin-right: 6px;
    }
    > span:last-child {
      font-weight: 600;
      font-size: 16px;
    }
  }
`;

const AnalyzeBtn = styled.button``;

export default RecordOverview;
