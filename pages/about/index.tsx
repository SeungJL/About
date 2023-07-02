import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Seo from "../../components/Seo";
import { useStudyQuickVoteMutation } from "../../hooks/study/mutations";
import { arrangeMainSpace } from "../../libs/utils/studyUtils";
import AboutHeader from "../../pagesComponents/about/main/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/AboutMain";
import AboutUpperBar from "../../pagesComponents/about/main/aboutMain/AboutUpperBar";
import AboutVoteNav from "../../pagesComponents/about/main/aboutMain/AboutVoteNav";
import AboutNavigation from "../../pagesComponents/about/main/AboutNavigation";
import Calendar from "../../pagesComponents/about/main/Calendar";
import ReadyToOpen from "../../pagesComponents/about/main/ReadyToOpen";
import DateSetting from "../../pagesComponents/setting/DateSetting";
import StudySetting from "../../pagesComponents/setting/StudySetting";
import UserSetting from "../../pagesComponents/setting/UserSetting";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { mySpaceFixedState, voteDateState } from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import { IParticipation, IPlace } from "../../types/studyDetails";

interface IAbout {
  repo: IPlace[];
}

function About() {
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(userLocationState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [participations, setParticipations] = useState<IParticipation[]>([]);
  const [studySpaces, setStudySpaces] = useState<IParticipation[]>([]);
  const [myVoteList, setMyVoteList] = useState<string[]>([""]);

  const { mutate } = useStudyQuickVoteMutation(dayjs().date(8), {
    onSuccess(data) {
      console.log(3, data);
    },
  });

  useEffect(() => {
    if (!participations?.length) return;
    const arrangedSpace = arrangeMainSpace(
      participations?.filter((space) => space !== mySpaceFixed)
    );
    setStudySpaces(arrangedSpace);
    setIsMainLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySpaceFixed, participations]);
  const onClick = () => {
    mutate({ start: dayjs().hour(15), end: dayjs().hour(18) });
  };
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
        <button onClick={onClick}>3</button>
        <AboutHeader />
        <AboutNavigation />
        <AboutUpperBar />
        <Calendar />
        {location !== "안양" ? (
          <>
            <AboutVoteNav participations={participations} />
            <AboutMain studySpaces={studySpaces} myVoteList={myVoteList} />
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
