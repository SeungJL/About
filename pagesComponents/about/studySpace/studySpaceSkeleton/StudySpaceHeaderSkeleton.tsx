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
  height: var(--header-height);
  padding: 0 var(--padding-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: var(--padding-max);
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-left: var(--margin-main);
  width: 100px;
`;

export default StudySpaceHeaderSkeleton;
