import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { useStudyArrivedCntQuery } from "../../../hooks/study/queries";
import { useUserAttendRateQuery } from "../../../hooks/user/studyStatistics/queries";
import { IDateRange } from "../../../pages/record";
interface IRecordDetailOverview {}

function RecordDetailOverview({}: IRecordDetailOverview) {
  const { data: session } = useSession();

  const [isFirst, setIsFirst] = useState(true);

  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: dayjs().date(1),
    endDate: dayjs(),
  });

  const { data } = useUserAttendRateQuery(
    dateRange?.startDate,
    dateRange?.endDate
  );

  const { data: currentMonthAttend } = useUserAttendRateQuery(
    dayjs().date(1),
    dayjs()
  );

  const myMonthAttend = currentMonthAttend?.find(
    (who) => who?.uid === session?.uid
  );

  const { data: myArrivedCnt, isLoading } = useStudyArrivedCntQuery();
  return (
    <>
      {!isLoading && (
        <Layout>
          <Title>
            {isFirst ? `${dayjs().month() + 1}월 참여` : "전체 참여"}
          </Title>
          <Value>
            {isFirst
              ? myMonthAttend?.cnt
              : myArrivedCnt[session?.uid as string]}
            회 참여
          </Value>
          <ChangeBtn onClick={() => setIsFirst((old) => !old)}>
            <span>전환</span>
            <FontAwesomeIcon icon={faRightLeft} size="xs" />
          </ChangeBtn>
        </Layout>
      )}
    </>
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

const Title = styled.span``;

const Value = styled.span`
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

export default RecordDetailOverview;
