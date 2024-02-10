"use client";

import Image from "next/image";
import Link from "next/link";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination]);

type Size = "md";

interface IImageTile {
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
          <Link href={imageTile.url} className="flex flex-col">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image src={imageTile.imageUrl} fill={true} alt="eventImg" />
            </div>
            <div className="webkit-clamp-1 pt-2 text-xs">{imageTile.text}</div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageTileSlider;
