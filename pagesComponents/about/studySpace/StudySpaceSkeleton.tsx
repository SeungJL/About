import styled from "styled-components";
import StudySpaceCoverSkeleton from "./studySpaceSkeleton/StudySpaceCoverSkeleton";
import StudySpaceHeaderSkeleton from "./studySpaceSkeleton/StudySpaceHeaderSkeleton";

import StudySpaceOverviewSkeleton from "./studySpaceSkeleton/StudySpaceOverviewSkeleton";
import StudyTimeTableSkeleton from "./studySpaceSkeleton/StudySpaceTimeTableSkeleton";
import StudySpaceVoteOverviewSkeleton from "./studySpaceSkeleton/StudySpaceVoteOverview";

interface IStudySpaceSkeleton {
  coverImageUrl: string;
}

function StudySpaceSkeleton({ coverImageUrl }: IStudySpaceSkeleton) {
  return (
    <Layout>
      <StudySpaceHeaderSkeleton />
      <Wrapper>
        <StudySpaceCoverSkeleton coverImageUrl={coverImageUrl} />
        <StudySpaceOverviewSkeleton />
        <HrDiv />
        <StudySpaceVoteOverviewSkeleton />
        <StudyTimeTableSkeleton />
      </Wrapper>
    </Layout>
  );
}

const Layout = styled.div``;

const Wrapper = styled.div`
  padding: 0 16px;
`;
const HrDiv = styled.div`
  height: 8px;
  background-color: var(--font-h7);
`;

export default StudySpaceSkeleton;
