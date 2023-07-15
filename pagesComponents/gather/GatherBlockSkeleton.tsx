import styled from "styled-components";
import Skeleton from "../../components/common/skeleton/Skeleton";

function GatherBlockSkeleton() {
  return (
    <>
      <Layout>
        <GatherBlockHeader>
          <Skeleton>temp</Skeleton>
        </GatherBlockHeader>
        <Title>
          <Skeleton>temp</Skeleton>
        </Title>
        <GatherDetail>
          <span>
            <Skeleton>temp</Skeleton>
          </span>
          <span>
            <Skeleton>temp</Skeleton>
          </span>
        </GatherDetail>
        <GatherMember>
          <Writer>
            <ProfileIcon>
              <Skeleton>temp</Skeleton>
            </ProfileIcon>
            <span>
              <Skeleton>temp</Skeleton>
            </span>
          </Writer>
          <Voter>
            <Skeleton>temp</Skeleton>
          </Voter>
        </GatherMember>
      </Layout>
    </>
  );
}

export default GatherBlockSkeleton;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: var(--border-main-light);
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
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
    margin: var(--margin-min) 0;
  }
`;

const GatherMember = styled.div`
  margin-top: var(--margin-sub);
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  margin: var(--margin-min) 0;
  width: 100px;
  font-size: 15px;
`;
const Writer = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: var(--margin-md);
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
