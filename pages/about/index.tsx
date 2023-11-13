import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { arrangeMainSpace } from "../../helpers/studyHelpers";
import AboutCalendar from "../../pagesComponents/about/main/aboutCalendar/AboutCalendar";
import AboutCategoryNav from "../../pagesComponents/about/main/AboutCategoryNav";
import AboutGather from "../../pagesComponents/about/main/aboutGather/AboutGather";
import AboutHeader from "../../pagesComponents/about/main/aboutHeader/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/aboutMain/AboutMain";
import AboutReview from "../../pagesComponents/about/main/AboutReview";
import AboutStudyHeader from "../../pagesComponents/about/main/AboutStudyHeader";
import EventBanner from "../../pagesComponents/about/main/EventBanner";
import AboutWinRecord from "../../pagesComponents/about/main/WinRecord";
import DateSetting from "../../pagesComponents/setting/DateSetting";
import StudySetting from "../../pagesComponents/setting/StudySetting";
import UserSetting from "../../pagesComponents/setting/UserSetting";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import {
  myStudyState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { IParticipation } from "../../types/study/studyDetail";

function About() {
  const voteDate = useRecoilValue(voteDateState);
  const participations = useRecoilValue(participationsState);
  const myStudy = useRecoilValue(myStudyState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [otherStudies, setOtherStudies] = useState<IParticipation[]>([]);

  //스터디 정렬
  useEffect(() => {
    if (!participations) {
      setOtherStudies([]);
      return;
    }
    const arrangedOtherStudies = arrangeMainSpace(
      [...participations],
      studyDateStatus !== "not passed"
    );
    console.log(4, arrangedOtherStudies);
    const filtered =
      studyDateStatus === "not passed" &&
      !voteDate.isSame(dayjs().add(1, "day").startOf("day"))
        ? arrangedOtherStudies.filter((par) => par.place.brand !== "자유 신청")
        : arrangedOtherStudies;
    setOtherStudies(filtered);

    setTimeout(() => {
      setIsMainLoading(false);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myStudy, participations]);

  return (
    <>
      <Setting>
        <DateSetting />
        <UserSetting />
        <StudySetting />
      </Setting>
      <Layout>
        <AboutHeader />
        <AboutCategoryNav />
        {voteDate && (
          <>
            <AboutStudyHeader />
            <AboutCalendar />
            <AboutMain participations={otherStudies} />
            <EventBanner />
            <AboutGather />
            <AboutReview />
            <AboutWinRecord />
          </>
        )}
      </Layout>
    </>
  );
}

const Setting = styled.div``;
const Layout = styled.div`
  min-height: 100vh;
  padding-bottom: 40px;
`;

export default About;
