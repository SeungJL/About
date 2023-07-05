import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { useStudyCheckRecordsQuery } from "../../hooks/study/queries";

import RecordCalendar from "../../pagesComponents/record/RecordCalendar";
import RecordDetail from "../../pagesComponents/record/RecordDetail";
import RecordLocationCategory from "../../pagesComponents/record/RecordLocationCategory";
import RecordMonthNav from "../../pagesComponents/record/RecordMonthNav";
import RecordNavigation from "../../pagesComponents/record/RecordNavigation";
import RecordOverview from "../../pagesComponents/record/RecordOverview";
import RecordSetting from "../../pagesComponents/record/RecordSetting";
import { IArrivedData } from "../../types/studyRecord";

export interface IDateRange {
  startDate: Dayjs;
  endDate: Dayjs;
}

function Record() {
  const [month, setMonth] = useState(dayjs().month());
  const [isCalendar, setIsCalendar] = useState(true);
  const [openData, setOpenData] = useState<IArrivedData[]>();
  const [monthData, setMonthData] = useState<IArrivedData[]>([]);
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: dayjs().date(1),
    endDate: dayjs().date(dayjs().daysInMonth()),
  });

  const { data: arrivedData } = useStudyCheckRecordsQuery(
    dateRange?.startDate,
    dateRange?.endDate,
    {
      onSuccess(data) {
        setOpenData(data);
      },
    }
  );

  return (
    <>
      <Header title="스터디 기록" />
      <RecordSetting
        openData={openData}
        month={month}
        setMonthData={setMonthData}
        monthData={monthData}
      />
      <Layout>
        <RecordMonthNav
          month={month}
          setMonth={setMonth}
          setDateRange={setDateRange}
        />
        <RecordOverview openData={openData} dateRange={dateRange} />
        <RecordLocationCategory
          setOpenData={setOpenData}
          arrivedData={arrivedData}
        />
        {isCalendar ? (
          <RecordCalendar month={month} monthData={monthData} />
        ) : (
          <RecordDetail monthData={monthData} month={month} />
        )}
        <RecordNavigation
          isCalendar={isCalendar}
          setIsCalendar={setIsCalendar}
        />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default Record;
