import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import RecordCalendar from "../../pagesComponents/record/RecordCalendar";
import RecordCalendarSetting from "../../pagesComponents/record/RecordCalendarSetting";
import RecordLocationCategory from "../../pagesComponents/record/RecordLocationCategory";
import RecordMonthNav from "../../pagesComponents/record/RecordMonthNav";

import RecordNavigation from "../../pagesComponents/record/RecordNavigation";
import RecordOverview from "../../pagesComponents/record/RecordOverview";
import RecordSkeleton from "../../pagesComponents/record/RecordSkeleton";

import { IArrivedData } from "../../types/study/study";

export interface IDateRange {
  startDate: Dayjs;
  endDate: Dayjs;
}

export interface INavMonth {
  year: number;
  month: number;
}

function Record() {
  //매달 1일을 기준으로 함
  const [navMonth, setNavMonth] = useState(dayjs().startOf("month"));
  const [arrivedCalendar, setArrivedCalendar] = useState<IArrivedData[]>();
  const [filterData, setFilterData] = useState<IArrivedData[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [isCalendar, setIsCalendar] = useState(true);

  useEffect(() => {
    if (!arrivedCalendar) return;
    setFilterData(arrivedCalendar);
    setIsLoading(false);
  }, [arrivedCalendar]);

  return (
    <>
      <Header title="스터디 기록" />
      <RecordCalendarSetting
        navMonth={navMonth}
        setArrivedCalendar={setArrivedCalendar}
      />
      <Layout>
        <RecordMonthNav month={navMonth.month()} setNavMonth={setNavMonth} />
        {!isLoading ? (
          <>
            <RecordOverview arrivedCalendar={arrivedCalendar} />
            <RecordLocationCategory
              initialData={arrivedCalendar}
              setFilterData={setFilterData}
            />
            {isCalendar ? (
              <RecordCalendar filterData={filterData} navMonth={navMonth} />
            ) : (
              // <RecordDetail monthData={monthData} month={month} />
              <></>
            )}
            <RecordNavigation
              isCalendar={isCalendar}
              setIsCalendar={setIsCalendar}
            />
          </>
        ) : (
          <RecordSkeleton />
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default Record;
