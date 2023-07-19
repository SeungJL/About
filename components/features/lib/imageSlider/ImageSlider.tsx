import styled from "styled-components";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // for the pagination dots
import { IUser } from "../../../../types/user/user";
import ImageSliderGatherReviewNav from "./imageSliderType/ImageSliderGatherReviewNav";
import ImageSliderMember from "./imageSliderType/ImageSliderMember";
import ImageSliderPoint from "./imageSliderType/ImageSliderPoint";
import ImageSliderReview from "./imageSliderType/ImageSliderReview";

SwiperCore.use([Navigation, Pagination]); // apply the Pagination module

export type ImageContainer = string[] | IImageSliderItem[] | IUser[];

export interface IImageSliderItem {
  image: string;
  title: string;
  id: number;
}
interface IImageSlider {
  type: string;
  imageContainer: ImageContainer;
}

function ImageSlider({ type, imageContainer }: IImageSlider) {
  return (
    <>
      {imageContainer && (
        <Layout isHeight={type === "review"}>
          {type === "point" ? (
            <ImageSliderPoint imageContainer={imageContainer} />
          ) : imageContainer?.length && type === "review" ? (
            <ImageSliderReview imageContainer={imageContainer} />
          ) : type === "gatherReviewNav" ? (
            <ImageSliderGatherReviewNav imageContainer={imageContainer} />
          ) : type === "member" ? (
            <ImageSliderMember imageContainer={imageContainer} />
          ) : null}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div<{ isHeight: boolean }>`
  text-align: center;
  width: 100%;
  height: ${(props) => (props.isHeight ? "100%" : "auto")};
`;

export default ImageSlider;
