import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import ImageSlider from "../../components/utils/ImageSlider";
import KakaoShareBtn from "../../components/utils/KakaoShare";
import { WEB_URL } from "../../constants/system";
import ReviewCategory from "../../pagesComponents/Review/ReviewCategory";
import ReviewContent from "../../pagesComponents/Review/ReviewContent";
import ReviewItemHeader from "../../pagesComponents/Review/ReviewItemHeader";
import ReviewStatus from "../../pagesComponents/Review/ReviewStatus";
import { reviewContentIdState } from "../../recoil/previousAtoms";
import { REVIEW_DATA } from "../../storage/Review";

function Review() {
  const [category, setCateogry] = useState();
  const router = useRouter();
  const url = WEB_URL + router?.asPath;
  const temp = {
    name: "이승주",
    profileImage:
      "https://p.kakaocdn.net/th/talkp/wnRiSzjBU5/8bx7JYsl1lMDmJk4KjnJV0/xukg66_640x640_s.jpg",
    avatar: { bg: 3, type: 2 },
  };

  const reviewContentId = useRecoilValue(reviewContentIdState);

  useEffect(() => {
    if (reviewContentId)
      document.getElementById(`review${reviewContentId}`)?.scrollIntoView();
  }, [reviewContentId]);

  return (
    <>
      <Header title="모임 리뷰">
        <KakaoShareBtn
          title="모임 리뷰"
          subtitle="즐거운 모임 가득 ~!"
          url={url}
          img={REVIEW_DATA && REVIEW_DATA[0]?.images[0]}
        />
      </Header>
      <Layout>
        <ReviewCategory category={category} setCategory={setCateogry} />
        <Main>
          {REVIEW_DATA?.slice()
            .reverse()
            ?.map((item) => (
              <Item id={"review" + item.id} key={item.id}>
                <ReviewItemHeader temp={temp} date={item?.date} />
                <ImageWrapper>
                  <ImageSlider ImageContainer={item?.images} type="review" />
                </ImageWrapper>

                {/* <ReviewGatherConnection /> */}
                <ReviewContent text={item?.text} />
                <ReviewStatus temp={temp} />
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
