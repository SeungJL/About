import styled from "styled-components";

interface IstudySkeleton {
  coverImageUrl: string;
}

function studySkeleton({ coverImageUrl }: IstudySkeleton) {
  return (
    <Layout>
      {/* <StudyHeaderSkeleton />
      <Wrapper>
        <StudyCoverSkeleton coverImageUrl={coverImageUrl} />
        <StudyOverviewSkeleton />
        <HrDiv />
        <StudyDateBarSkeleton />
        <StudyTimeTableSkeleton />
      </Wrapper> */}
    </Layout>
  );
}

const Layout = styled.div``;

const Wrapper = styled.div``;
const HrDiv = styled.div`
  height: 1px;
  background-color: var(--gray-7);
`;

export default studySkeleton;
