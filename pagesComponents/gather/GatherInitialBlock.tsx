import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../components/common/skeleton/Skeleton";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";
import { IGatherContent } from "../../types/gather";

interface IGatherBlock {
  data: IGatherContent;
}

function GatherSkeletonBlock() {
  const isGatherLoading = useRecoilValue(isGatherLoadingState);
  return (
    <>
      <Layout>
        <GatherBlockHeader>
          <Skeleton isLoad={!isGatherLoading}>temp</Skeleton>
        </GatherBlockHeader>
        <Title>
          <Skeleton isLoad={!isGatherLoading}>temp</Skeleton>
        </Title>
        <GatherDetail>
          <span>
            <Skeleton isLoad={!isGatherLoading}>temp</Skeleton>
          </span>
          <span>
            <Skeleton isLoad={!isGatherLoading}>temp</Skeleton>
          </span>
        </GatherDetail>
        <GatherMember>
          <Writer>
            <ProfileIcon>
              <Skeleton isLoad={!isGatherLoading}>temp</Skeleton>
            </ProfileIcon>
            <span>
              <Skeleton isLoad={!isGatherLoading}>temp</Skeleton>
            </span>
          </Writer>
          <Voter>
            <Skeleton isLoad={!isGatherLoading}>temp</Skeleton>
          </Voter>
        </GatherMember>
      </Layout>
    </>
  );
}

export default GatherSkeletonBlock;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid var(--font-h6);
  padding: 14px;
`;

const GatherBlockHeader = styled.div`
  width: 180px;
  font-size: 12px;
`;

const GatherDetail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  > span {
    width: 80px;
    margin-bottom: 1px;
  }
`;

const GatherMember = styled.div`
  margin-top: 12px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  margin: 6px 0;
  width: 130px;
  font-size: 15px;
`;
const Writer = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: 6px;
  }
`;

const Voter = styled.div`
  width: 50px;
  height: 20px;
`;

const ProfileIcon = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;
`;
