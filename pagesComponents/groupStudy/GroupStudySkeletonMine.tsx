import styled from "styled-components";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";

function GroupStudySkeletonMine() {
  return (
    <Layout>
      <Skeleton>
        <Wrapper>temp</Wrapper>
      </Skeleton>
    </Layout>
  );
}

const Layout = styled.div`
  height: 148px;
  border-bottom: 6px solid var(--font-h56);
`;

const Wrapper = styled.div`
  padding-bottom: var(--padding-main);
`;

export default GroupStudySkeletonMine;
