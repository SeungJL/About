import Image from "next/image";
import { useRouter } from "next/router";
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

  const onClick = (id: number) => {
    setPrevPageUrl("/about");
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
                  layout="fill"
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
  margin-top: var(--margin-max);
`;

const ReviewContainer = styled.div`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-main);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--margin-main);
`;

const ReviewItem = styled.div``;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: var(--border-radius2);
  overflow: hidden;
`;

const ReviewText = styled.div`
  color: var(--font-h1);
  font-size: 13px;
  margin-top: var(--margin-sub);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default AboutReview;
