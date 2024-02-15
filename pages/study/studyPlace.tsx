import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageSlide from "../../components/layout/PageSlide";
import AboutMainItem from "../../pageTemplates/home/main/HomeStudySection/HomeStudySectionItem";
import { prevPageUrlState } from "../../recoil/previousAtoms";
import { myStudyState } from "../../recoil/studyAtoms";
import { transferStudyDataState } from "../../recoil/transferDataAtoms";

function StudyPlace() {
  const participations = useRecoilValue(transferStudyDataState);
  const myStudyFixed = useRecoilValue(myStudyState);

  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);

  useEffect(() => {
    setPrevPageUrl("/home/studyPlace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageSlide>
      <Header title={`${dayjs().format("M월 D일")} 스터디`} isPrev={true} />
      <Spacer />
      <Main>
        {participations?.map((participation, idx) => (
          <AboutMainItem
            participation={participation}
            key={idx}
            isImagePriority={myStudyFixed ? idx < 4 : idx < 5}
          />
        ))}
      </Main>
    </PageSlide>
  );
}

const Main = styled.main`
  padding: 0 var(--gap-4);
`;

const Spacer = styled.div`
  height: var(--gap-5);
`;

export default StudyPlace;
