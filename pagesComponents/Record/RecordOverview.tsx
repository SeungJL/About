import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { useState } from "react";
import NotCompletedModal from "../../modals/system/NotCompletedModal";
import { useParticipationRateQuery } from "../../hooks/user/queries";
import { IVoteRate } from "../../types/studyRecord";
import dayjs from "dayjs";

function RecordOverview({
  totalOpen,
  totalAttendance,
  myRecentAttend,
  myMonthCnt,
}: {
  totalOpen: number;
  totalAttendance: number;
  myRecentAttend: string;
  myMonthCnt: number;
}) {
  const [isNotCompleted, setIsNotCompleted] = useState(false);

  return (
    <>
      <Layout>
        <MyRecord>
          <MyRecordItem>
            <div>
              <span>스터디 오픈</span>
              <span>{totalOpen}회</span>
            </div>
            <div>
              <span>참여한 인원</span>
              <span>{totalAttendance}명</span>
            </div>
          </MyRecordItem>
          <MyRecordItem>
            <div>
              <span>내 참여 횟수</span>
              <span style={{ color: "var(--color-mint)" }}>{myMonthCnt}회</span>
            </div>
            <div>
              <span>내 최근 참여</span>
              <span style={{ color: "var(--color-mint)" }}>
                {dayjs(myRecentAttend).format("M월 DD일")}
              </span>
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
  > div:first-child {
    width: 125px;
  }
  > div:last-child {
    width: 140px;
  }
`;

const MyRecordItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

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
