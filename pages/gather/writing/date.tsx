import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/CustomToast";
import GatherWritingDateDate from "../../../pagesComponents/gather/writing/GatherWritingDateDate";
import GatherWritingDateSubject from "../../../pagesComponents/gather/writing/GatherWritingDateSubject";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";
import { GatherListItem } from "../../../types/page/gather";

function WritingDate() {
  const failToast = useFailToast();
  const router = useRouter();

  const [gatherWriting, setGatherWriting] = useRecoilState(
    sharedGatherWritingState
  );

  const [date, setDate] = useState<Date>();
  const [gatherList, setGatherList] = useState<GatherListItem[]>();

  const onClickNext = () => {
    if (gatherList && !gatherList[0].text) {
      failToast("free", "1차 모임 작성은 필수입니다!", true);
      return;
    }
    const givenDay = dayjs(date);
    if (givenDay.isSame(dayjs(), "day") && givenDay.hour() === 14) {
      failToast("free", "날짜/시간 선택은 필수입니다!", true);
      return;
    }
    setGatherWriting((old) => ({
      ...old,
      date: dayjs(date),
      gatherList,
    }));
    router.push(`/gather/writing/condition`);
  };

  return (
    <PageLayout>
      <ProgressStatus value={75} />
      <Header title="" url="/gather/writing/content" />
      <RegisterLayout>
        <RegisterOverview>
          <span>날짜와 주제를 선택해 주세요.</span>
        </RegisterOverview>
        <GatherWritingDateDate
          date={date}
          setDate={setDate}
          gatherWriting={gatherWriting}
        />
        <GatherWritingDateSubject
          gatherWriting={gatherWriting}
          setGatherList={setGatherList}
        />
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageLayout>
  );
}

export default WritingDate;
