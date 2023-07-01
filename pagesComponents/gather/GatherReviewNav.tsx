import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ImageSlider from "../../components/utils/ImageSlider";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";
import { REVIEW_DATA } from "../../storage/Review";
import GatherSkeletonImageSlider from "./GatherSkeletonImageSlider";

function GatherReviewNav() {
  const isGatherLoading = useRecoilValue(isGatherLoadingState);
  const ImageArr = REVIEW_DATA.slice()
    .reverse()
    .map((item) => ({
      image: item.images[0],
      title: item.title,
      id: item.id,
    }));

  return (
    <Layout>
      {!isGatherLoading ? (
        <ImageSlider type="gatherReviewNav" ImageContainer={ImageArr} />
      ) : (
        <GatherSkeletonImageSlider />
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding-top: 14px;
  padding-bottom: 4px;
  padding-left: 14px;
  display: flex;
  overflow-x: auto;

  border-top: var(--border-main);
  border-bottom: 8px solid var(--border-color);
`;

export default GatherReviewNav;
