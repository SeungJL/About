import Image from "next/image";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // for the pagination dots
import { useState } from "react";
import { background } from "@chakra-ui/react";
import ModalPortal from "../ModalPortal";
import FullImageModal from "../../modals/FullImageModal";

SwiperCore.use([Navigation, Pagination]); // apply the Pagination module

function ImageSlider({
  type,
  ImageContainer,
}: {
  type: string;
  ImageContainer: string[];
}) {
  const [isFull, setIsFull] = useState(false);
  const [fullImage, setFullImage] = useState("");

  const onClickImage = (image: string) => {
    setIsFull((old) => !old);
    setFullImage(image);
  };

  return (
    <>
      {ImageContainer && (
        <Layout>
          {type === "point" ? (
            <Swiper
              navigation
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
          ) : ImageContainer?.length && type === "review" ? (
            <Swiper
              navigation
              pagination={true}
              modules={[Pagination]} // enable pagination
              style={{ width: "100%", height: "100%", background: "pink" }}
            >
              {ImageContainer?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`${image}`}
                    alt={`Slide ${index}`}
                    layout="fill"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;

const PointItem = styled.div`
  background-color: var(--font-h7);
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius2);
`;

export default ImageSlider;
