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
import { IArrivedData } from "../../types/studyRecord";

export interface IDateRange {
  startDate: Dayjs;
  endDate: Dayjs;
}

function Record() {
  const [month, setMonth] = useState(dayjs().month());
  const [isCalendar, setIsCalendar] = useState(true);
  const [totalData, setTotalData] = useState<IArrivedData[]>([]);

  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: dayjs().date(1),
    endDate: dayjs().date(dayjs().daysInMonth()),
  });

  const { data: arrivedData } = useStudyCheckRecordsQuery(
    dateRange?.startDate,
    dateRange?.endDate,
    {
      onSuccess(data) {
        setTotalData(data);
      },
    }
  );
  return (
    <>
      <Header title="스터디 기록" />
      <Layout>
        <RecordMonthNav
          month={month}
          setMonth={setMonth}
          setDateRange={setDateRange}
        />
        <RecordOverview totalData={totalData} dateRange={dateRange} />
        <RecordLocationCategory
          setTotalData={setTotalData}
          arrivedData={arrivedData}
        />
        {isCalendar ? (
          <RecordCalendar month={month} totalData={totalData} />
        ) : (
          <RecordDetail totalData={totalData} />
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

// data = [
//   {date:"2023-04-01", totalInfo:[
//     {
//      location:"수원", arrivedInfoList:[
//        {spaceId:"6402c323e2414d15",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"6262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"5862c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"4562c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//       ]
//     },
//     {
//       location:"양천", arrivedInfoList:[
//        {spaceId:"6102c323e2414d15",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"4462c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"2262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"5162c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//       ]
//     },
//    ]
//   },
//    {date:"2023-04-02", totalInfo:[
//     {
//      location:"수원", arrivedInfoList:[
//        {spaceId:"6262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"6402c323e2414d15",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"6262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"6262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//       ]
//     },
//     {
//       location:"양천", arrivedInfoList:[
//        {spaceId:"6402c323e2414d15",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"6262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"6262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//        {spaceId:"6262c323e2414d45",arrivedInfo:[{uid:"22243514"},{uid:"2152552535"},{uid:"252353525"} ]},
//       ]
//     },
//    ]
//   },
//  ...
// ]
