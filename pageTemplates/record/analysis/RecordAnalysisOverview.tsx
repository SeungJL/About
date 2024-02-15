import { faRightLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { useStudyArrivedCntQuery } from "../../../hooks/study/queries";
import { useUserAttendRateQuery } from "../../../hooks/user/sub/studyRecord/queries";

function RecordAnalysisOverview() {
  const { data: session } = useSession();

  const [isFirst, setIsFirst] = useState(true);

  const { data: myMonthAttend } = useUserAttendRateQuery(
    dayjs().date(0),
    dayjs(),
    true
  );

  const { data: myArrivedCnt, isLoading } = useStudyArrivedCntQuery(
    session?.user?.uid as string
  );

  return (
    <Layout>
      {!isLoading && (
        <>
          <Title>
            {isFirst ? `${dayjs().month() + 1}월 참여` : "누적 참여"}
          </Title>
          <Value>{isFirst ? myMonthAttend?.cnt : myArrivedCnt}회 참여</Value>
          <ChangeBtn onClick={() => setIsFirst((old) => !old)}>
            <span>전환</span>
            <FontAwesomeIcon icon={faRightLeft} size="xs" />
          </ChangeBtn>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 var(--gap-4);
  height: 140px;
  background-color: var(--color-mint);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.8;
`;

const Title = styled.span``;

const Value = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const ChangeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--gap-2);
  background-color: #08ad9f;
  width: 58px;
  height: 28px;
  font-size: 13px;
  border-radius: var(--rounded-lg);
  > span:first-child {
    margin-right: var(--gap-2);
  }
`;

export default RecordAnalysisOverview;
