import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { useArrivedDataQuery } from "../../hooks/vote/queries";
import RecordCalendar from "../../pagesComponents/Record/RecordCalendar";
import RecordDetail from "../../pagesComponents/Record/RecordDetail";
import RecordLineBar from "../../pagesComponents/Record/RecordLineBar";
import RecordMonthNav from "../../pagesComponents/Record/RecordMonthNav";
import RecordNavigation from "../../pagesComponents/Record/RecordNavigation";
import RecordOverview from "../../pagesComponents/Record/RecordOverview";
import RecordTotal from "../../pagesComponents/Record/RecordTotal";
import { voteDateState } from "../../recoil/studyAtoms";
import { Location } from "../../types/system";

function Record() {
  const voteDate = useRecoilValue(voteDateState);
  // const A = useArrivedDataQuery(dayjs().subtract(2, "day"));

  const [month, setMonth] = useState(dayjs().month());
  const [isCalendar, setIsCalendar] = useState(true);
  const [category, setCategory] = useState<Location>("all");

  const data = [{ date: dayjs().date(4), arrivedInfo: [] }];

  return (
    <>
      <Header title="기록" />
      <Layout>
        <RecordMonthNav month={month} setMonth={setMonth} />
        <RecordOverview />
        <RecordLineBar category={category} setCategory={setCategory} />
        {isCalendar ? <RecordCalendar month={month} /> : <RecordDetail />}
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
