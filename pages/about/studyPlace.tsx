@ -1,36 +0,0 @@
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import AboutMainItem from "../../pagesComponents/about/main/aboutMain/AboutMainItem";
import { myStudyFixedState } from "../../recoil/studyAtoms";
import { transferStudyDataState } from "../../recoil/transferDataAtoms";

function StudyPlace() {
  const participations = useRecoilValue(transferStudyDataState);
  const myStudyFixed = useRecoilValue(myStudyFixedState);

  return (
    <PageLayout>
      <Header title={`${dayjs().format("M월 D일")} 스터디`} />
      <Spacer />
      <Main>
        {myStudyFixed && <AboutMainItem participation={myStudyFixed} />}
        {participations?.map((participation, idx) => (
          <AboutMainItem participation={participation} key={idx} />
        ))}
      </Main>
    </PageLayout>
  );
}

const Main = styled.main`
  padding: 0 var(--padding-main);
`;

const Spacer = styled.div`
  height: var(--margin-max);
`;

export default StudyPlace;
