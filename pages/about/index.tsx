import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Seo from "../../components/Seo";
import { arrangeMainSpace } from "../../libs/utils/studyUtils";
import AboutHeader from "../../pagesComponents/About/main/AboutHeader";
import AboutMain from "../../pagesComponents/About/main/AboutMain";
import AboutUpperBar from "../../pagesComponents/About/main/AboutMain/AboutUpperBar";
import AboutVoteNav from "../../pagesComponents/About/main/AboutMain/AboutVoteNav";
import AboutNavigation from "../../pagesComponents/About/main/AboutOverview";
import Calendar from "../../pagesComponents/About/main/Calendar";
import ReadyToOpen from "../../pagesComponents/About/main/ReadyToOpen";
import DateSetting from "../../pagesComponents/Setting/DateSetting";
import StudySetting from "../../pagesComponents/Setting/StudySetting";
import UserSetting from "../../pagesComponents/Setting/UserSetting";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { mySpaceFixedState, voteDateState } from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import { IParticipation } from "../../types/studyDetails";

function About() {
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(userLocationState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);
  const [participations, setParticipations] = useState<IParticipation[]>([]);
  const [studySpaces, setStudySpaces] = useState<IParticipation[]>([]);
  const [myVoteList, setMyVoteList] = useState<string[]>([""]);

  useEffect(() => {
    if (!participations?.length) return;
    const arrangedSpace = arrangeMainSpace(
      participations?.filter((space) => space !== mySpaceFixed)
    );
    setStudySpaces(arrangedSpace);
    setIsMainLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySpaceFixed, participations]);

  return (
    <>
      <Seo title="About" />
      <Setting>
        <UserSetting />
        <DateSetting setParticipations={setParticipations} />
        {voteDate && (
          <StudySetting
            participations={participations}
            setMyVoteList={setMyVoteList}
          />
        )}
      </Setting>
      <Layout>
        <AboutHeader />
        <AboutNavigation />
        <AboutUpperBar />
        <Calendar />
        {location !== "안양" ? (
          <>
            <AboutVoteNav participations={participations} />
            <AboutMain otherStudySpaces={studySpaces} myVoteList={myVoteList} />
          </>
        ) : (
          <ReadyToOpen />
        )}
      </Layout>
      {/* <AboutFooter />*/}
    </>
  );
}

const Setting = styled.div``;
const Layout = styled.div``;

export default About;
