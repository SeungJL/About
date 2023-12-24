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
        marginLeft: "var(--margin-main)",
        width: "100%",
        height: "auto",
        position: "relative",
        paddingBottom: "var(--padding-main)",
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
                  layout="fill"
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
  padding: var(--padding-sub) var(--padding-sub);
  padding-bottom: var(--padding-min);
  background-color: white;
  box-shadow: var(--box-shadow-b);
  border-radius: var(--border-radius2);
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: var(--border-sub);
  border-radius: var(--border-radius2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Name = styled(SingleLineText)`
  font-size: 13px;
  font-weight: 600;
  margin-top: var(--margin-md);
  padding-bottom: var(--padding-min);
`;

export default ImageSliderGroupStudy;
