import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import RecordMonthNav from "../../components/features/atoms/MonthNav";

import Header from "../../components/layout/Header";
import Slide from "../../components/layout/PageSlide";
import RecordDetail from "../../pageTemplates/record/detail/RecordDetail";
import RecordCalendar from "../../pageTemplates/record/RecordCalendar";
import RecordCalendarSetting from "../../pageTemplates/record/RecordCalendarSetting";
import RecordLocationCategory from "../../pageTemplates/record/RecordLocationCategory";

import RecordNavigation from "../../pageTemplates/record/RecordNavigation";
import RecordOverview from "../../pageTemplates/record/RecordOverview";
import RecordSkeleton from "../../pageTemplates/record/RecordSkeleton";

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
      <Slide isFixed={true}>
        <Header title="스터디 기록" />
      </Slide>
      <Slide>
        <RecordCalendarSetting
          navMonth={navMonth}
          setArrivedCalendar={setArrivedCalendar}
          setIsRecordLoading={setIsLoading}
        />

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
              <RecordDetail filterData={filterData} navMonth={navMonth} />
            )}
          </>
        ) : (
          <RecordSkeleton isCalendar={isCalendar} />
        )}
      </Slide>
      <Slide isFixed={true} posZero="top">
        <RecordNavigation
          isCalendar={isCalendar}
          setIsCalendar={setIsCalendar}
        />
      </Slide>
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
