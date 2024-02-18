import { Box, Flex } from "@chakra-ui/react";
import { faLock } from "@fortawesome/pro-duotone-svg-icons";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import IconButtonColBlock, {
  IIconButtonColBlockProps,
} from "../../components2/atoms/blocks/IconButtonColBlock";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import BlockSlider from "../../components2/organisms/sliders/BlockSlider";
import ImageTileSlider, {
  IImageTile,
} from "../../components2/organisms/sliders/ImageTileSlider";
import { STORE_GIFT } from "../../storage/Store";

interface IEventMain {}
export default function EventMain({}: IEventMain) {
  const imageArr: IImageTile[] = STORE_GIFT.map((gift) => ({
    imageUrl: gift.image,
    text: gift.name,
    url: "" + gift.giftId,
  }));

  const block: IIconButtonColBlockProps = {
    icon: <FontAwesomeIcon icon={faLock} />,
    title: "아메리카노",
    buttonProp: {
      text: "10 point",
      func: () => {},
    },
    disabled: true,
  };

  const A = <IconButtonColBlock props={block} />;

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        bgColor="white"
        borderBottom="var(--border)"
      >
        <SectionBar
          title="포인트 스토어"
          size="md"
          rightComponent={
            <Link href="/store" style={{ padding: "8px" }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          }
        />
      </Flex>

      <Box p="12px 16px" borderBottom="var(--border)">
        <ImageTileSlider
          imageTileArr={imageArr}
          size="sm"
          slidesPerView={3.5}
        />
      </Box>
      <SectionBar
        title="배지를 해금하고 포인트를 받아봐요!"
        size="md"
        hasMoreBtn={false}
      />
      <Box py="16px" pl="16px">
        <BlockSlider blocks={[A, A, A, A]} slidesPerView={2.4} />
      </Box>
    </>
  );
}
