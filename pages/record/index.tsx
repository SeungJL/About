import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { useArrivedDataQuery } from "../../hooks/vote/queries";
import RecordCalendar from "../../pagesComponents/Record/RecordCalendar";
import RecordLineBar from "../../pagesComponents/Record/RecordLineBar";
import RecordMonthNav from "../../pagesComponents/Record/RecordMonthNav";
import RecordNavigation from "../../pagesComponents/Record/RecordNavigation";
import RecordOverview from "../../pagesComponents/Record/RecordOverview";
import RecordTotal from "../../pagesComponents/Record/RecordTotal";
import { voteDateState } from "../../recoil/studyAtoms";

function Record() {
  const voteDate = useRecoilValue(voteDateState);
  const A = useArrivedDataQuery(dayjs().subtract(2, "day"));

  const [month, setMonth] = useState(dayjs().month());

  return (
    <>
      <Header title="기록" />
      <Layout>
        <RecordMonthNav month={month} setMonth={setMonth} />
        <RecordOverview />

        <RecordLineBar />

        <RecordCalendar month={month} />
        <RecordNavigation />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 8px;
`;

const TotalOpen = styled.div`
  padding: 0 14px;
  font-weight: 600;
  font-size: 13px;
  color: var(--font-h2);
`;

const MonthNav = styled.nav``;

const HrDiv = styled.div`
  height: 6px;
  background-color: var(--font-h7);
`;

export default Record;
