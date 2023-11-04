import { faImage } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { reviewContentIdState } from "../../../../recoil/previousAtoms";
import { IImageSliderItem, ImageContainer } from "../ImageSlider";

interface IImageSliderGatherReviewNav {
  imageContainer: ImageContainer;
}

function ImageSliderGatherReviewNav({
  imageContainer,
}: IImageSliderGatherReviewNav) {
  const router = useRouter();
  const setReviewContentId = useSetRecoilState(reviewContentIdState);
  const onClickReviewItem = (id: number) => {
    if (id) setReviewContentId(id);
    router.push("review");
  };

  return (
    <Swiper
      navigation
      style={{
        width: "100%",
        height: "auto",
      }}
      slidesPerView={4.6}
    >
      <SwiperSlide onClick={() => onClickReviewItem(0)}>
        <GatherReviewNavItem>
          <ImageWrapper>
            <FontAwesomeIcon
              icon={faImage}
              size="2x"
              color="var(--color-mint)"
            />
          </ImageWrapper>
          <span>리뷰</span>
        </GatherReviewNavItem>
      </SwiperSlide>
      {(imageContainer as IImageSliderItem[]).map((item, index) => (
        <SwiperSlide key={index} onClick={() => onClickReviewItem(item.id)}>
          <GatherReviewNavItem>
            <ImageWrapper>
              <Image
                src={item.image}
                alt={`Slide ${index}`}
                width={54}
                height={54}
                priority={index < 4}
              />
            </ImageWrapper>
            <span>{item.title}</span>
          </GatherReviewNavItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const GatherReviewNavItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 68px;
  align-items: center;
  > span {
    font-size: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ImageWrapper = styled.div`
  border-radius: var(--border-radius-main);
  width: 52px;
  height: 52px;
  overflow: hidden;
  background-color: var(--font-h56);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--margin-md);
`;

export default ImageSliderGatherReviewNav;
