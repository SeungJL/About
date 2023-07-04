import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Skeleton from "../../../../components/common/Skeleton";

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
          <div>
            <FontAwesomeIcon icon={faLocationDot} size="sm" />
            <span>지도</span>
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
  margin-top: 36px;
  padding-bottom: 18px;
  > span:first-child {
    font-weight: 600;
    font-size: 18px;
  }
  > div:first-child {
    width: 200px;
  }
`;

const SpaceDetail = styled.div`
  color: var(--font-h2);
  font-size: 12px;
  font-weight: 600;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  > span {
    > span {
      margin-left: 4px;
    }
  }
`;
const Location = styled.span`
  display: flex;

  > div:first-child {
    margin-left: 6px;
    width: 220px;
    color: var(--font-h1);
    margin-right: 12px;
  }
  > div {
    > span:last-child {
      margin-left: 2px;
    }
  }
`;
const Time = styled.span`
  margin-top: 1px;
  display: flex;
  > div {
    margin-left: 6px;
    width: 80px;
  }
`;

export default StudySpaceOverviewSkeleton;
