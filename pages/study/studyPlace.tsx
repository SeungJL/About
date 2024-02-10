import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import AboutMainItem from "../../pageTemplates/home/main/homeMain/homeMainItem";
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
    <PageLayout>
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
