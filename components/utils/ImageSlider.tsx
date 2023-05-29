import Image from "next/image";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // for the pagination dots
import { background } from "@chakra-ui/react";

SwiperCore.use([Navigation, Pagination]); // apply the Pagination module

function ImageSlider({
  type,
  ImageContainer,
}: {
  type?: string;
  ImageContainer?: string[];
}) {
  const images = [
    "https://user-images.githubusercontent.com/84257439/235453825-026ca653-d356-485a-a916-19c21352e10a.png",
    "https://user-images.githubusercontent.com/84257439/235454304-3b3df7be-07a2-4b14-a6fa-410bc0de6249.png",
    "https://user-images.githubusercontent.com/84257439/235454307-84ae13fb-99ce-478b-82a6-22c5a69e87ff.png",
  ];

  return (
    <Layout>
      {type === "point" ? (
        <Swiper
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          style={{
            width: "100%",
            height: "100px",

            padding: "8px",
          }}
          slidesPerView={3}
        >
          {ImageContainer.map((image, index) => (
            <SwiperSlide key={index}>
              <PointItem>
                <Image src={image} alt={`Slide ${index}`} layout="fill" />
              </PointItem>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          navigation
          pagination={true}
          modules={[Pagination]} // enable pagination
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          style={{ width: "100%", height: "100%" }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt={`Slide ${index}`} layout="fill" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  text-align: center;
`;

const PointItem = styled.div`
  background-color: var(--font-h7);
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius2);
`;

export default ImageSlider;
