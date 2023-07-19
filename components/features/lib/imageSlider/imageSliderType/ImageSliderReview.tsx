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
      navigation
      pagination={true}
      modules={[Pagination]} // enable pagination
      style={{ width: "100%", height: "100%", background: "pink" }}
    >
      {imageContainer?.map((image, index) => (
        <SwiperSlide key={index}>
          <Image src={`${image}`} alt={`Slide ${index}`} layout="fill" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSliderReview;
