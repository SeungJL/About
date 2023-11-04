import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ImageSlider from "../../components/dataViews/imageSlider/ImageSlider";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";
import { REVIEW_DATA } from "../../storage/Review";
import GatherImageSliderSkeleton from "./GatherImageSliderSkeleton";

const IMAGE_VISIBLE = 6;

function GatherReviewNav() {
  const isGatherLoading = useRecoilValue(isGatherLoadingState);
  const ImageArr = [...REVIEW_DATA]
    .slice(-IMAGE_VISIBLE)
    .reverse()
    .map((item) => ({
      image: item.images[0],
      title: item.title,
      id: item.id,
    }));

  return (
    <Layout>
      {!isGatherLoading ? (
        <ImageSlider type="gatherReviewNav" imageContainer={ImageArr} />
      ) : (
        <GatherImageSliderSkeleton />
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-md) 0;
  margin: 0 var(--margin-sub);
  display: flex;
  align-items: center;
`;

export default GatherReviewNav;
