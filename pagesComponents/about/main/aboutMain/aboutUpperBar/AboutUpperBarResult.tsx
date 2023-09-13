import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../../../../components/common/skeleton/Skeleton";
import { isMainLoadingState } from "../../../../../recoil/loadingAtoms";
import {
  myStudyFixedState,
  studyDateState,
} from "../../../../../recoil/studyAtoms";
import AboutMainItem from "../AboutMainItem";
import NoMyStudy from "../NoMyStudy";

function AboutUpperBarResult() {
  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(myStudyFixedState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

  return (
    <Layout>
      {studyDate !== "not passed" && (
        <Skeleton isLoad={!isMainLoading}>
          <Result>
            <Wrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {isMainLoading ? null : mySpaceFixed !== null ? (
                <AboutMainItem participation={mySpaceFixed} />
              ) : (
                <NoMyStudy />
              )}
            </Wrapper>
          </Result>
        </Skeleton>
      )}
    </Layout>
  );
}

const Layout = styled.div`

`;

const Result = styled.div`
  margin: 16px 0;
  min-height: 100px;
  > span {
    display: inline-block;
    color: var(--font-h1);
    font-weight: 600;
    font-size: 18px;
  }
`;

const Wrapper = styled(motion.div)``;

export default AboutUpperBarResult;
