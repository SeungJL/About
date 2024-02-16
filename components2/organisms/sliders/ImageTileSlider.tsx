import styled from "styled-components";

import { AspectRatio } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SingleLineText } from "../../../styles/layout/components";

SwiperCore.use([Navigation, Pagination]);

type Size = "md";

export interface IImageTile {
  imageUrl: string;
  text: string;
  url: string;
}

interface IImageTileSlider {
  imageTileArr: IImageTile[];
  size: Size;
}

function ImageTileSlider({ imageTileArr, size }: IImageTileSlider) {
  const imageSizeObj: { [key in Size]: number } = {
    md: 80,
  };

  const imageSize = imageSizeObj[size];

  return (
    <Swiper slidesPerView={4.5} spaceBetween={20}>
      {imageTileArr.map((imageTile, index) => (
        <SwiperSlide key={index}>
          <Link
            href={imageTile.url}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <AspectRatio
              ratio={1}
              pos="relative"
              rounded="lg"
              overflow="hidden"
            >
              <Image src={imageTile.imageUrl} fill={true} alt="eventImg" />
            </AspectRatio>
            <Text>{imageTile.text}</Text>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const Text = styled(SingleLineText)`
  padding-top: 8px;
  font-size: 12px;
`;

export default ImageTileSlider;
