import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arrangeMainSpace } from "../../helpers/studyHelpers";
import AboutCalendar from "../../pagesComponents/about/main/aboutCalendar/AboutCalendar";
import AboutCategoryNav from "../../pagesComponents/about/main/AboutCategoryNav";
import AboutGather from "../../pagesComponents/about/main/aboutGather/AboutGather";
import AboutHeader from "../../pagesComponents/about/main/aboutHeader/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/aboutMain/AboutMain";
import AboutReview from "../../pagesComponents/about/main/AboutReview";
import AboutStudyHeader from "../../pagesComponents/about/main/AboutStudyHeader";
import AboutStudyResult from "../../pagesComponents/about/main/aboutStudyResult/AboutStudyResult";
import AboutVoteNav from "../../pagesComponents/about/main/AboutVoteNav";
import EventBanner from "../../pagesComponents/about/main/EventBanner";
import AboutWinRecord from "../../pagesComponents/about/main/WinRecord";
import DateSetting from "../../pagesComponents/setting/DateSetting";
import StudySetting from "../../pagesComponents/setting/StudySetting";
import UserSetting from "../../pagesComponents/setting/UserSetting";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import {
  myStudyFixedState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { IParticipation } from "../../types/study/studyDetail";

function About() {
  const myStudyFixed = useRecoilValue(myStudyFixedState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const [participations, setParticipations] =
    useRecoilState(participationsState);
  const voteDate = useRecoilValue(voteDateState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [otherStudies, setOtherStudies] = useState<IParticipation[]>([]);

  const isFirstRender = useRef(true);

  //스터디 정렬 *내 스터디 *투표 인원수 고려
  useEffect(() => {
    //첫번째 렌더링시에만 적용
    if (isFirstRender.current) {
      setIsMainLoading(true);
      setParticipations(null);
      isFirstRender.current = false;
      return;
    }
    if (!participations) {
      setOtherStudies([]);
      return;
    }
    const arrangedOtherStudies = arrangeMainSpace(
      participations?.filter((space) => space !== myStudyFixed),
      studyDateStatus !== "not passed"
    );
    setOtherStudies(arrangedOtherStudies);
    //0.1초 정도의 딜레이를 주는게 더 자연스러움
    setTimeout(() => {
      setIsMainLoading(false);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myStudyFixed, participations]);

  return (
    <>
      <Setting>
        <UserSetting />
        <DateSetting />
        <StudySetting />
      </Setting>
      <Layout>
        <AboutHeader />
        <AboutCategoryNav />
        <AboutStudyHeader />
        {studyDateStatus !== "not passed" && <AboutStudyResult />}
        {voteDate && <AboutCalendar />}
        {studyDateStatus === "not passed" && <AboutVoteNav />}
        <AboutMain participations={otherStudies} />
        <EventBanner />
        <AboutGather />
        <AboutReview />
        <AboutWinRecord />
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
