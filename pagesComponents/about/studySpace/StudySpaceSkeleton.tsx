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

const Wrapper = styled.div``;
const HrDiv = styled.div`
  height: 1px;
  background-color: var(--border-color);
`;

export default StudySpaceSkeleton;
