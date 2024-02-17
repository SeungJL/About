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

type Size = "sm" | "md" | "lg";

export interface IImageTile {
  imageUrl: string;
  text: string;
  url: string;
}

interface IImageTileSlider {
  imageTileArr: IImageTile[];
  size: Size;
  slidesPerView: number;
  aspect?: number;
}

function ImageTileSlider({
  imageTileArr,
  size,
  aspect = 1,
  slidesPerView,
}: IImageTileSlider) {
  const imageSizeObj: { [key in Size]: number } = {
    sm: 60,
    md: 80,
    lg: 120,
  };

  const imageSize = imageSizeObj[size];

  return (
    <Swiper slidesPerView={slidesPerView} spaceBetween={12}>
      {imageTileArr.map((imageTile, index) => (
        <SwiperSlide key={index}>
          <CustomLink href={imageTile.url}>
            <AspectRatio
              ratio={aspect / 1}
              pos="relative"
              rounded="lg"
              overflow="hidden"
            >
              <Image src={imageTile.imageUrl} fill={true} alt="slideImage" />
            </AspectRatio>
            <Text>{imageTile.text}</Text>
          </CustomLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const CustomLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 12px;
  padding-bottom: 4px;
  border: var(--border);
  border-radius: var(--rounded-lg);
  box-shadow: var(--shadow);
`;

const Text = styled(SingleLineText)`
  text-align: center;
  font-weight: 600;
  padding-top: 8px;
  font-size: 12px;
`;

export default ImageTileSlider;
