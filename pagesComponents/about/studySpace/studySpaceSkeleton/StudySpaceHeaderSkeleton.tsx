import {
  faArrowUpFromBracket,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Skeleton from "../../../../components/common/Skeleton";

function StudySpaceHeaderSkeleton() {
  return (
    <Layout>
      <div>
        <FontAwesomeIcon icon={faChevronLeft} />
        <Title>
          <Skeleton>temp</Skeleton>
        </Title>
      </div>
      <div>
        {location && <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />}
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
  width: 100px;
`;

export default StudySpaceHeaderSkeleton;
