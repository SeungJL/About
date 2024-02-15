import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import SectionHeader from "../../../components/layout/atoms/SectionHeader";
import {
  prevPageUrlState,
  reviewContentIdState,
} from "../../../recoil/previousAtoms";
import { REVIEW_DATA } from "../../../storage/Review";
function AboutReview() {
  const router = useRouter();

  const setReviewContentId = useSetRecoilState(reviewContentIdState);
  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onClick = (id: number) => {
    setPrevPageUrl("/home");
    if (id !== -1) setReviewContentId(id);
    router.push(`review`);
  };
  return (
    <Layout>
      <SectionHeader title="ABOUT 모임 후기" url="/review" />
      <ReviewContainer>
        {REVIEW_DATA.slice()
          .reverse()
          .slice(0, 4)
          .map((item) => (
            <ReviewItem key={item.id} onClick={() => onClick(item.id)}>
              <ImageContainer>
                <Image
                  src={item.images[0]}
                  fill={true}
                  sizes="164px"
                  alt="aboutReviewImage"
                />
              </ImageContainer>
              <ReviewText>
                {!item.text ? "후기 생략" : item.text.slice(0, 40)}
              </ReviewText>
            </ReviewItem>
          ))}
      </ReviewContainer>
    </Layout>
  );
}

const Layout = styled.div`
  background-color: var(--gray-8);
  padding-bottom: var(--gap-4);
`;

const ReviewContainer = styled.div`
  margin: 0 var(--gap-4);
  margin-top: var(--gap-4);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-4);
`;

const ReviewItem = styled.button``;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: var(--rounded);
  overflow: hidden;
`;

// const ImageWrapper = styled.div<{isLoaded:boolean}>`
// visibility:${props=>!props.isLoaded?"hidden":"show"};
// `;

const ReviewText = styled.div`
  color: var(--gray-1);
  font-size: 13px;
  margin-top: var(--gap-3);
  text-align: start;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default AboutReview;
