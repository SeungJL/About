import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { MainLoading } from "../../components/ui/MainLoading";
import { useParticipationRateQuery } from "../../hooks/user/queries";
import { useArrivedDataQuery } from "../../hooks/vote/queries";
import RecordCalendar from "../../pagesComponents/Record/RecordCalendar";
import RecordDetail from "../../pagesComponents/Record/RecordDetail";
import RecordLineBar from "../../pagesComponents/Record/RecordLineBar";
import RecordMonthNav from "../../pagesComponents/Record/RecordMonthNav";
import RecordNavigation from "../../pagesComponents/Record/RecordNavigation";
import RecordOverview from "../../pagesComponents/Record/RecordOverview";
import RecordTotal from "../../pagesComponents/Record/RecordTotal";
import { voteDateState } from "../../recoil/studyAtoms";
import { SPACE_LOCATION } from "../../storage/study";
import { IArrivedData } from "../../types/studyRecord";
import { Location } from "../../types/system";

function Record() {
  const { data: session } = useSession();
  const [month, setMonth] = useState(dayjs().month());
  const [isCalendar, setIsCalendar] = useState(true);
  const [totalData, setTotalData] = useState<IArrivedData[]>([]);

  const [category, setCategory] = useState<Location>("all");
  const [startDay, setStartDay] = useState<Dayjs>(dayjs().date(1));
  const [endDay, setEndDay] = useState<Dayjs>(
    dayjs().date(dayjs().daysInMonth())
  );
  const [myRecentAttend, setMyRecentAttend] = useState<string>();

  const [totalOpen, setTotalOpen] = useState<number>();
  const [totalAttendance, setTotalAttendance] = useState<number>();

  useEffect(() => {
    setStartDay(dayjs().month(month).date(1));
    setEndDay(dayjs().month(month).date(dayjs().daysInMonth()));
  }, [month]);

  const { data: arrivedData, isLoading } = useArrivedDataQuery(
    startDay,
    endDay,
    {
      onSuccess(data) {
        setTotalData(data);
      },
    }
  );

  useEffect(() => {
    if (category !== "all")
      setTotalData(
        arrivedData.map((item) => {
          return {
            ...item,
            arrivedInfoList: item.arrivedInfoList.filter(
              (place) => SPACE_LOCATION[place?.placeId] === category
            ),
          };
        })
      );
    else setTotalData(arrivedData);
  }, [arrivedData, category]);

  const { data: myAttend } = useParticipationRateQuery(startDay, endDay);

  const myMonthCnt = myAttend?.find((user) => user.uid === session?.uid)?.cnt;

  useEffect(() => {
    let myRecentDate = null;
    let open = 0;
    let num = 0;
    totalData?.forEach((data) => {
      const arrivedInfoList = data?.arrivedInfoList;
      open += arrivedInfoList.length;
      arrivedInfoList.some((info) => {
        const arrivedInfo = info?.arrivedInfo;
        num += arrivedInfo.length;
        return arrivedInfo.some((who) => who.uid === session?.uid);
      }) && (myRecentDate = data.date);
    });
    setTotalOpen(open);
    setTotalAttendance(num);
    setMyRecentAttend(myRecentDate);
  }, [session?.uid, totalData]);

  return (
    <>
      <Header title="스터디 기록" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          <RecordMonthNav month={month} setMonth={setMonth} />
          <RecordOverview
            totalOpen={totalOpen}
            totalAttendance={totalAttendance}
            myRecentAttend={myRecentAttend}
            myMonthCnt={myMonthCnt}
          />
          <RecordLineBar category={category} setCategory={setCategory} />
          {isCalendar ? (
            <RecordCalendar month={month} totalData={totalData} />
          ) : (
            <RecordDetail
              totalData={totalData}
              setMyRecentAttend={setMyRecentAttend}
            />
          )}
          <RecordNavigation
            isCalendar={isCalendar}
            setIsCalendar={setIsCalendar}
          />
        </Layout>
      )}
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
