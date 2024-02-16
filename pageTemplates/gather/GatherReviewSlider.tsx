import { Box } from "@chakra-ui/react";
import ImageTileSlider from "../../components2/organisms/sliders/ImageTileSlider";
import { REVIEW_DATA } from "../../storage/Review";

const IMAGE_VISIBLE = 6;

export default function GatherReviewSlider() {
  const imageArr = [...REVIEW_DATA]
    .slice(-IMAGE_VISIBLE)
    .reverse()
    .map((item) => ({
      imageUrl: item.images[0],
      text: item.title,
      url: `/review?scroll=${item.id}`,
    }));

  return (
    <Box p="16px">
      <ImageTileSlider imageTileArr={imageArr} size="md" />
    </Box>
  );
}
