import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // for the pagination dots
import { Swiper, SwiperSlide } from "swiper/react";
import { reviewContentIdState } from "../../recoil/previousAtoms";
import { IImageSliderItem } from "../../types/utils";

SwiperCore.use([Navigation, Pagination]); // apply the Pagination module

interface IImageSlider {
  type: string;
  ImageContainer: string[] | IImageSliderItem[];
}

function ImageSlider({ type, ImageContainer }: IImageSlider) {
  const router = useRouter();
  const [isFull, setIsFull] = useState(false);
  const [fullImage, setFullImage] = useState("");
  const setReviewContentId = useSetRecoilState(reviewContentIdState);
  const onClickImage = (image: string) => {
    setIsFull((old) => !old);
    setFullImage(image);
  };

  const onClickReviewItem = (id: number) => {
  
    if (id) setReviewContentId(id);
    router.push("review");
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
              style={{ width: "100%", height: "100%" }}
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
          ) : type === "gatherReviewNav" ? (
            <Swiper
              navigation
              style={{
                width: "100%",
                height: "100px",
              }}
              slidesPerView={4.6}
            >
              <SwiperSlide onClick={() => onClickReviewItem(0)}>
                <GatherReviewNavItem>
                  <div>
                    <FontAwesomeIcon
                      icon={faImage}
                      size="2x"
                      color="var(--color-mint)"
                    />
                  </div>
                  <span>리뷰</span>
                </GatherReviewNavItem>
              </SwiperSlide>
              {(ImageContainer as IImageSliderItem[]).map((item, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => onClickReviewItem(item.id)}
                >
                  <GatherReviewNavItem>
                    <div>
                      <Image
                        src={item.image}
                        alt={`Slide ${index}`}
                        width={54}
                        height={54}
                      />
                    </div>
                    <span>{item.title}</span>
                  </GatherReviewNavItem>
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

const GatherReviewNavItem = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 68px;
  align-items: center;

  > div {
    border-radius: var(--border-radius2);
    width: 52px;
    height: 52px;
    overflow: hidden;
    background-color: var(--font-h6);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  }
  > span {
    font-size: 10px;
  }
`;

export default ImageSlider;
