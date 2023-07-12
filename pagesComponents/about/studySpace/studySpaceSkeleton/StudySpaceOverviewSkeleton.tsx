import styled from "styled-components";
import Skeleton from "../../../../components/common/skeleton/Skeleton";

function StudySpaceOverviewSkeleton() {
  return (
    <Layout>
      <div>
        <Skeleton>temp</Skeleton>
      </div>
      <SpaceDetail>
        <Location>
          위치:
          <div>
            <Skeleton>temp</Skeleton>
          </div>
        </Location>
        <Time>
          시간:
          <div>
            <Skeleton>temp</Skeleton>
          </div>
        </Time>
      </SpaceDetail>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: 36px;
  padding-bottom: var(--padding-main);
  > div:first-child {
    display: inline-block;
    font-weight: 600;
    font-size: 18px;
    height: 25px;
  }
`;

const SpaceDetail = styled.div`
  color: var(--font-h2);
  font-size: 12px;
  font-weight: 600;
  margin-top: var(--margin-sub);
  display: flex;
  flex-direction: column;
  > span {
    > span {
      margin-left: var(--margin-min);
    }
  }
`;
const Location = styled.span`
  display: flex;

  > div:first-child {
    width: 240px;
    color: var(--font-h1);
    margin-left: var(--margin-min);
  }
`;
const Time = styled.span`
  display: flex;
  > div {
    margin-left: var(--margin-min);
    width: 80px;
  }
`;

export default StudySpaceOverviewSkeleton;
