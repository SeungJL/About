import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Category from "../../pagesComponents/gather/Category";
import { useState } from "react";
import ReviewItemHeader from "../../pagesComponents/Review/ReviewItemHeader";
import ImageSlider from "../../components/utils/ImageSlider";
import ReviewGatherConnection from "../../pagesComponents/Review/ReviewGatherConnection";
import ReviewContent from "../../pagesComponents/Review/ReviewContent";
import ReviewStatus from "../../pagesComponents/Review/ReviewStatus";
import ReviewCategory from "../../pagesComponents/Review/ReviewCategory";
import { REVIEW_DATA } from "../../storage/Review";
import KakaoShareBtn from "../../components/utils/KakaoShare";
import { useRouter } from "next/router";
import { WEB_URL } from "../../constants/system";

function Review() {
  const [category, setCateogry] = useState();
  const router = useRouter();
  const url = WEB_URL + router?.asPath;

  return (
    <>
      <Header title="모임 리뷰">
        <KakaoShareBtn
          title="모임 리뷰"
          subtitle="5/26 파티룸"
          url={url}
          img={REVIEW_DATA && REVIEW_DATA[0]?.images[0]}
        />
      </Header>
      <Layout>
        <ReviewCategory category={category} setCategory={setCateogry} />
        <Main>
          {REVIEW_DATA?.map((item) => (
            <Item key={item.id}>
              <ReviewItemHeader />
              <ImageWrapper>
                <ImageSlider ImageContainer={item?.images} type="review" />
              </ImageWrapper>
              {/* <ReviewGatherConnection /> */}
              <ReviewContent text={item?.text} />
              <ReviewStatus />
            </Item>
          ))}
        </Main>
      </Layout>
    </>
  );
}

const Layout = styled.div``;

const Main = styled.main`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  width: 100vw;
  height: 100vw;
`;

const Item = styled.div`
  margin-bottom: 60px;
`;

export default Review;
