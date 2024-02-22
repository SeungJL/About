import SectionBar from "../../components2/molecules/bars/SectionBar";
import ImageTileGridLayout, {
  IImageTileData,
} from "../../components2/molecules/layouts/ImageTitleGridLayout";
import { REVIEW_DATA } from "../../storage/Review";

export default function HomeReviewSection() {
  const imageData: IImageTileData[] = REVIEW_DATA.slice(-4)
    .reverse()
    .map((review) => ({
      imageUrl: review.images[0],
      text: review.text,
      url: `/`,
    }));

  return (
    <>
      <SectionBar title="ABOUT 모임 후기" />
      <ImageTileGridLayout imageDataArr={imageData} />
    </>
  );
}
