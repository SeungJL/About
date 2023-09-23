import { faImage } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";

function GatherImageSliderSkeleton() {
  return (
    <Layout>
      <GatherReviewNavIcon>
        <div>
          <FontAwesomeIcon icon={faImage} size="2x" color="var(--color-mint)" />
        </div>
        <span>리뷰</span>
      </GatherReviewNavIcon>
      {new Array(6).map((item) => (
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
