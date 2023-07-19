import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageContainer } from "../ImageSlider";

interface IImageSliderPoint {
  imageContainer: ImageContainer;
}

function ImageSliderPoint({ imageContainer }: IImageSliderPoint) {
  return (
    <Swiper
      navigation
      style={{
        width: "100%",
        height: "auto",
      }}
      slidesPerView={3.2}
    >
      {imageContainer.map((image, index) => (
        <SwiperSlide key={index}>
          <PointItem>
            <Image
              src={image}
              alt={`Slide ${index}`}
              width="100%"
              height="100%"
            />
          </PointItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const PointItem = styled.div`
  background-color: var(--font-h7);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius-main);
`;

export default ImageSliderPoint;
