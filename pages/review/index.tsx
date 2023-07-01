import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../components/common/MainLoading";
import Header from "../../components/layouts/Header";
import ImageSlider from "../../components/utils/ImageSlider";
import KakaoShareBtn from "../../components/utils/KakaoShare";
import { WEB_URL } from "../../constants/system";
import { useGatherSummaryQuery } from "../../hooks/gather/queries";
import ReviewContent from "../../pagesComponents/review/ReviewContent";
import ReviewGatherSummary from "../../pagesComponents/review/ReviewGatherSummary";
import ReviewItemHeader from "../../pagesComponents/review/ReviewItemHeader";
import ReviewStatus from "../../pagesComponents/review/ReviewStatus";
import { reviewContentIdState } from "../../recoil/previousAtoms";
import { REVIEW_DATA } from "../../storage/Review";
import { GatherLocation, GatherType } from "../../types/gather";

export interface IGatherSummary {
  title: string;
  type: GatherType;
  location: GatherLocation;
  date: Dayjs | string;
  id: number;
}

interface IReview {
  id: number;
  date: string;
  images: string[];
  text: string;
  title: string;
  summary?: IGatherSummary;
}

function Review() {
  const router = useRouter();
  const [reviewData, setReviewData] = useState<IReview[]>();
  const url = WEB_URL + router?.asPath;
  const temp = {
    name: "이승주",
    profileImage:
      "https://p.kakaocdn.net/th/talkp/wnRiSzjBU5/8bx7JYsl1lMDmJk4KjnJV0/xukg66_640x640_s.jpg",
    avatar: { bg: 3, type: 2 },
  };

  const reviewContentId = useRecoilValue(reviewContentIdState);

  useGatherSummaryQuery({
    onSuccess(data) {
      const updatedReviewData = REVIEW_DATA.slice()
        .reverse()
        .map((review) => {
          const findItem = data.find((item) => item.id === review.id);
          return { ...review, summary: findItem || null };
        });
      setReviewData(updatedReviewData);
    },
  });
  console.log(reviewData);
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
        {!reviewData ? (
          <MainLoading />
        ) : (
          <Main>
            {reviewData?.map((item) => (
              <Item id={"review" + item.id} key={item.id}>
                <ReviewItemHeader temp={temp} date={item.date} />
                <ImageWrapper>
                  <ImageSlider ImageContainer={item.images} type="review" />
                </ImageWrapper>
                {item.summary && <ReviewGatherSummary summary={item.summary} />}
                <ReviewContent text={item.text} />
                <ReviewStatus temp={temp} />
              </Item>
            ))}
          </Main>
        )}
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
