import Image from "next/image";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageContainer } from "../ImageSlider";

SwiperCore.use([Navigation, Pagination]);

interface IImageSliderReview {
  imageContainer: ImageContainer;
}

function ImageSliderReview({ imageContainer }: IImageSliderReview) {
  return (
    <Swiper
      lazy={true}
      navigation
      pagination={true}
      style={{ width: "100%", height: "100%" }}
    >
      {imageContainer?.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={`${image}`}
            alt={`Slide ${index}`}
            layout="fill"
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSliderReview;
