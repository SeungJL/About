import styled from "styled-components";
import Skeleton from "../../../../components/common/Skeleton";

function AboutMainSkeletonItem() {
  return (
    <Layout>
      <Skeleton>temp</Skeleton>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export default AboutMainSkeletonItem;
