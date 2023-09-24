import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useFailToast } from "../../hooks/CustomToast";
import { useUserAttendRateQuery } from "../../hooks/user/studyStatistics/queries";
import NotCompletedModal from "../../modals/system/NotCompletedModal";
import { IDateRange } from "../../pages/record";
import { isRecordLoadingState } from "../../recoil/loadingAtoms";
import { IArrivedData } from "../../types/study/study";
import RecordOverviewSkeleton from "./skeleton/RecordOverviewSkeleton";
interface IRecordOverview {
  dateRange: IDateRange;
  openData: IArrivedData[];
}

function RecordOverview({ openData, dateRange }: IRecordOverview) {
  const failToast = useFailToast();
  const { data: session } = useSession();
  const router = useRouter();
  const isGuest = session?.user.name === "guest";
  const userUid = session?.uid;

  const [isNotCompleted, setIsNotCompleted] = useState(false);
  const [myRecentAttend, setMyRecentAttend] = useState<string>();
  const [totalOpen, setTotalOpen] = useState<number>();
  const [totalAttendance, setTotalAttendance] = useState<number>();

  const isRecordLoading = useRecoilValue(isRecordLoadingState);

  const processAttendanceData = (userUid: string, openData: IArrivedData[]) => {
    let myRecentDate = null;
    let open = 0;
    let num = 0;
    openData.forEach((data) => {
      const arrivedInfoList = data.arrivedInfoList;
      open += arrivedInfoList.length;
      num += arrivedInfoList.reduce(
        (sum, info) => sum + info.arrivedInfo.length,
        0
      );
      if (
        !myRecentDate &&
        arrivedInfoList.some((info) =>
          info.arrivedInfo.some((who) => who.uid === userUid)
        )
      )
        myRecentDate = data.date;
    });
    setTotalOpen(open);
    setTotalAttendance(num);
    setMyRecentAttend(myRecentDate);
  };

  useEffect(() => {
    if (userUid && openData) processAttendanceData(userUid as string, openData);
  }, [userUid, openData]);

  const { data: myAttend } = useUserAttendRateQuery(
    dateRange?.startDate,
    dateRange?.endDate
  );

  const myMonthCnt = myAttend?.find((user) => user.uid === userUid)?.cnt;

  const onClickDetail = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    router.push(`/record/detail`);
  };

  return (
    <>
      {!isRecordLoading ? (
        <Layout>
          <MyRecord>
            <MyRecordItem>
              <div>
                <ContentName>스터디 오픈</ContentName>
                <ContentValue>{totalOpen}회</ContentValue>
              </div>
              <div>
                <ContentName>참여한 인원</ContentName>
                <ContentValue>{totalAttendance}명</ContentValue>
              </div>
            </MyRecordItem>
            <MyRecordItem>
              <div>
                <ContentName>내 참여 횟수</ContentName>
                <ContentValue style={{ color: "var(--color-mint)" }}>
                  {myMonthCnt || 0}회
                </ContentValue>
              </div>
              <div>
                <ContentName>내 최근 참여</ContentName>
                <ContentValue style={{ color: "var(--color-mint)" }}>
                  {!isGuest && myRecentAttend
                    ? dayjs(myRecentAttend).format("M월 DD일")
                    : "기록 없음"}
                </ContentValue>
              </div>
            </MyRecordItem>
          </MyRecord>
          <Button color="var(--font-h2)" onClick={onClickDetail}>
            분석
          </Button>
        </Layout>
      ) : (
        <RecordOverviewSkeleton />
      )}
      {isNotCompleted && <NotCompletedModal setIsModal={setIsNotCompleted} />}
    </>
  );
}

const Layout = styled.div`
  padding: var(--padding-sub) var(--padding-main);
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

  > div {
    display: flex;
    align-items: center;
  }
`;

const ContentName = styled.span`
  margin-right: var(--margin-min);
  color: var(--font-h3);
  font-size: 13px;
`;

const ContentValue = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: var(--font-h2);
`;

export default RecordOverview;
