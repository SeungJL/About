import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Skeleton from "../../components/common/skeleton/Skeleton";
import { DEFAULT_ARRAY } from "../../constants/default";

function GatherImageSliderSkeleton() {
  return (
    <Layout>
      <GatherReviewNavIcon>
        <div>
          <FontAwesomeIcon icon={faImage} size="2x" color="var(--color-mint)" />
        </div>
        <span>리뷰</span>
      </GatherReviewNavIcon>
      {DEFAULT_ARRAY.map((item) => (
        <GatherReviewNavItem key={item}>
          <div>
            <Skeleton>temp</Skeleton>
          </div>
          <span>
            <Skeleton>temp</Skeleton>
          </span>
        </GatherReviewNavItem>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-md);
  margin-bottom: 15px;
  display: flex;
  overflow: hidden;
`;
const GatherReviewNavIcon = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
  width: 68px;
  align-items: center;
  > div {
    border-radius: var(--border-radius-main);
    width: 52px;
    height: 52px;
    overflow: hidden;
    background-color: var(--font-h6);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  }
  > span {
    font-size: 10px;
  }
`;
const GatherReviewNavItem = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
  width: 68px;
  align-items: center;

  > div {
    border-radius: var(--border-radius-main);
    width: 52px;
    height: 52px;
    overflow: hidden;
    background-color: var(--font-h6);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  }
  > span {
    display: inline-block;
    width: 50px;
    font-size: 10px;
  }
`;

export default GatherImageSliderSkeleton;
