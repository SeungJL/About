import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { transferGroupStudyDataState } from "../../../../recoil/transferDataAtoms";
import { SingleLineText } from "../../../../styles/layout/components";
import { IGroupStudy } from "../../../../types/page/groupStudy";
import { ImageContainer } from "../ImageSlider";

interface IImageSliderGroupStudy {
  imageContainer: ImageContainer;
}

function ImageSliderGroupStudy({ imageContainer }: IImageSliderGroupStudy) {
  const router = useRouter();
  const [pageNum, setPageNum] = useState(0);

  const setGroupStudy = useSetRecoilState(transferGroupStudyDataState);

  const handleSliderChange = (swiper) => {
    setPageNum(swiper.realIndex);
  };

  const onClick = (groupStudy: IGroupStudy) => {
    setGroupStudy(groupStudy);
    router.push(`/groupStudy/${groupStudy.id}`);
  };

  return (
    <Swiper
      navigation
      scrollbar={{ draggable: true, el: ".swiper-scrollbar" }}
      style={{
        marginLeft: "var(--gap-4)",
        width: "100%",
        height: "auto",
        position: "relative",
        paddingBottom: "var(--gap-4)",
      }}
      slidesPerView={2.15}
      onSlideChange={handleSliderChange}
    >
      {(imageContainer as IGroupStudy[]).map((groupStudy, index) => (
        <SwiperSlide key={index}>
          <BlockLayout onClick={() => onClick(groupStudy)}>
            <ImageContainer>
              {groupStudy?.image && (
                <Image
                  src={groupStudy?.image}
                  fill={true}
                  sizes="130px"
                  alt="groupStudyImage"
                  priority={index < 2}
                />
              )}
            </ImageContainer>
            <Name>{groupStudy.title}</Name>
          </BlockLayout>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const BlockLayout = styled.button`
  height: 110px;
  width: 156px;
  padding: var(--gap-3) var(--gap-3);
  padding-bottom: var(--gap-1);
  background-color: white;
  box-shadow: var(--shadow);
  border-radius: var(--rounded);
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: var(--border);
  border-radius: var(--rounded);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Name = styled(SingleLineText)`
  font-size: 12px;
  font-weight: 600;
  padding-top: var(--gap-1);
  padding-bottom: var(--gap-1);
`;

export default ImageSliderGroupStudy;
