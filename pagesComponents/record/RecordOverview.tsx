import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { dayjsToFormat } from "../../helpers/dateHelpers";
import { useFailToast } from "../../hooks/CustomToast";
import NotCompletedModal from "../../modals/system/NotCompletedModal";
import { IArrivedData } from "../../types/study/study";
interface IRecordOverview {
  arrivedCalendar: IArrivedData[];
}

interface IStudySummary {
  myCnt: number;
  myRecent: number;
  openCnt: number;
  memberCnt: number;
}

function RecordOverview({ arrivedCalendar }: IRecordOverview) {
  const failToast = useFailToast();
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [studySummary, setStudySummary] = useState<IStudySummary>();
  const [isNotCompleted, setIsNotCompleted] = useState(false);

  useEffect(() => {
    let myRecent = null;
    let openCnt = 0;
    let memberCnt = 0;
    let myCnt = 0;
    const reverseData = arrivedCalendar.slice().reverse();
    reverseData.forEach((item) => {
      if (!item) return;
      const arrivedInfo = item.arrivedInfoList;
      openCnt += arrivedInfo.length;
      arrivedInfo.forEach((info) => {
        const memberList = info.arrivedInfo;
        memberCnt += memberList.length;
        if (memberList.find((who) => who.uid === session?.uid)) {
          myCnt++;
          if (!myRecent) myRecent = item.date;
        }
      });
    });
    const summary = { myCnt, myRecent, openCnt, memberCnt };
    setStudySummary(summary);
  }, [arrivedCalendar, session?.uid]);

  const onClickDetail = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    router.push(`/record/detail`);
  };

  return (
    <>
      <Layout>
        <MyRecord>
          <MyRecordItem>
            <div>
              <ContentName>스터디 오픈</ContentName>
              <ContentValue>{studySummary?.openCnt}회</ContentValue>
            </div>
            <div>
              <ContentName>참여한 인원</ContentName>
              <ContentValue>{studySummary?.memberCnt}명</ContentValue>
            </div>
          </MyRecordItem>
          <MyRecordItem>
            <div>
              <ContentName>내 참여 횟수</ContentName>
              <ContentValue style={{ color: "var(--color-mint)" }}>
                {studySummary?.myCnt}회
              </ContentValue>
            </div>
            <div>
              <ContentName>내 최근 참여</ContentName>
              <ContentValue style={{ color: "var(--color-mint)" }}>
                {!isGuest && studySummary?.myRecent
                  ? dayjsToFormat(dayjs().date(studySummary?.myRecent), "M/D")
                  : "기록 없음"}
              </ContentValue>
            </div>
          </MyRecordItem>
        </MyRecord>
        <Button
          w="60px"
          h="40px"
          color="var(--font-h2)"
          onClick={onClickDetail}
        >
          분석
        </Button>
      </Layout>
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
  margin-right: var(--margin-md);
  color: var(--font-h3);
  font-size: 13px;
`;

const ContentValue = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: var(--font-h2);
`;

export default RecordOverview;
