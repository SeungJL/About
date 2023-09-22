import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ImageSlider from "../../components/dataViews/chart/imageSlider/ImageSlider";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";
import { REVIEW_DATA } from "../../storage/Review";
import GatherImageSliderSkeleton from "./GatherImageSliderSkeleton";

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
        <ImageSlider type="gatherReviewNav" imageContainer={ImageArr} />
      ) : (
        <GatherImageSliderSkeleton />
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-main) 0;
  margin: 0 var(--margin-main);
  display: flex;
  align-items: center;

  border-top: var(--border-main-light);
`;

export default GatherReviewNav;
