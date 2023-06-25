import styled from "styled-components";
import ImageSlider from "../../components/utils/ImageSlider";
import { REVIEW_DATA } from "../../storage/Review";

function GatherReviewNav() {
  const ImageArr = REVIEW_DATA.map((item) => ({
    image: item.images[0],
    title: item.title,
    id: item.id,
  }));

  return (
    <Layout>
      <ImageSlider type="gatherReviewNav" ImageContainer={ImageArr} />
    </Layout>
  );
}

const Layout = styled.div`
  padding-top: 14px;
  padding-bottom: 4px;
  padding-left: 14px;
  display: flex;
  overflow-x: auto;
  border-bottom: 8px solid var(--border-hr-color);
`;

export default GatherReviewNav;
