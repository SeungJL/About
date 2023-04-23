import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { useState } from "react";
import NotCompletedModal from "../../modals/system/NotCompletedModal";

function RecordOverview() {
  const [isNotCompleted, setIsNotCompleted] = useState(false);
  return (
    <>
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
              <span>내 최근 참여</span>
              <span style={{ color: "var(--color-mint)" }}>4월 16일</span>
            </div>
          </MyRecordItem>
        </MyRecord>
        <Button color="var(--font-h2)" onClick={() => setIsNotCompleted(true)}>
          분석
        </Button>
      </Layout>
      {isNotCompleted && <NotCompletedModal setIsModal={setIsNotCompleted} />}
    </>
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
  width: 140px;

  margin-bottom: 6px;

  > div {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: 6px;
      color: var(--font-h3);
      font-size: 13px;
    }
    > span:last-child {
      font-weight: 700;
      font-size: 14px;
      color: var(--font-h2);
    }
  }
`;

const AnalyzeBtn = styled.button``;

export default RecordOverview;
