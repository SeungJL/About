import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../components/common/Skeleton";
import { DEFAULT_ARRAY } from "../../constants/default";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";

function GatherSkeletonImageSlider() {
  const isGahterLoading = useRecoilValue(isGatherLoadingState);

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
            <Skeleton isLoad={!isGahterLoading}>temp</Skeleton>
          </div>
          <span>
            <Skeleton isLoad={!isGahterLoading}>temp</Skeleton>
          </span>
        </GatherReviewNavItem>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  overflow: hidden;
`;
const GatherReviewNavIcon = styled.div`
  margin-right: 27px;
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
  margin-right: 27px;
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

export default GatherSkeletonImageSlider;
