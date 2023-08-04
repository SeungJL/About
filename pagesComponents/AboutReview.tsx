import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { reviewContentIdState } from "../recoil/previousAtoms";
import { REVIEW_DATA } from "../storage/Review";
function AboutReview() {
  const router = useRouter();
  const setReviewContentId = useSetRecoilState(reviewContentIdState);
  const onClick = (id: number) => {
    if (id !== -1) setReviewContentId(id);
    router.push(`review`);
  };
  return (
    <Layout>
      <Title>ABOUT 모임 후기</Title>
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
              <ReviewText>{item.text.slice(0, 40)}</ReviewText>
            </ReviewItem>
          ))}
      </ReviewContainer>
      <MoreInfoNav onClick={() => onClick(-1)}>
        <span>더보기</span>
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </MoreInfoNav>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: 32px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const ReviewContainer = styled.div`
  margin-top: var(--margin-main);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--margin-sub);
`;

const ReviewItem = styled.div``;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: var(--border-radius-main);
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const MoreInfoNav = styled.div`
  box-shadow: var(--box-shadow-sub);
  height: 44px;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  margin-top: var(--margin-max);
  margin-bottom: var(--margin-max);
  border-radius: var(--border-radius-main);
  color: var(--font-h3);
  font-weight: 600;
  > span:first-child {
    margin-right: var(--margin-md);
  }
`;
const ReviewText = styled.div`
  color: var(--font-h2);
  font-size: 12px;
  margin-top: var(--margin-sub);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default AboutReview;
