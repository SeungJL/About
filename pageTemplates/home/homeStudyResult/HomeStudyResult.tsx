import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../../components/common/masks/skeleton/Skeleton";
import { isMainLoadingState } from "../../../recoil/loadingAtoms";
import { myStudyState } from "../../../recoil/studyAtoms";
import AboutMainItem from "../homeMain/HomeMainItem";
import NoMyStudy from "./NoMyStudy";

function AboutStudyResult() {
  const myStudyFixed = useRecoilValue(myStudyState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

  return (
    <Layout isLoad={!isMainLoading}>
      <Skeleton isLoad={!isMainLoading}>
        <Result>
          {isMainLoading ? null : myStudyFixed !== null ? (
            <AboutMainItem
              participation={myStudyFixed}
              isMyResult={true}
              isImagePriority={true}
            />
          ) : (
            <NoMyStudy />
          )}
        </Result>
      </Skeleton>
    </Layout>
  );
}

const Layout = styled.div<{ isLoad: boolean }>`
  margin: 0 var(--padding-main);
  margin-top: var(--margin-sub);
  margin-bottom: ${(props) => (props.isLoad ? "0" : "29px")};
`;

const Result = styled.div`
  min-height: 110px;
  > span {
    display: inline-block;
    color: var(--font-h1);
    font-weight: 600;
    font-size: 18px;
  }
`;

export default AboutStudyResult;
