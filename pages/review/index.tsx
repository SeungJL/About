import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../components/common/MainLoading";
import ImageSlider from "../../components/features/lib/imageSlider/ImageSlider";
import KakaoShareBtn from "../../components/features/lib/KakaoShareBtn";
import Header from "../../components/layout/Header";
import ButtonCheckNav from "../../components/ui/ButtonCheckNav";
import { LOCATION_USE_ALL } from "../../constants/location";
import { WEB_URL } from "../../constants/system";
import { useGatherSummaryQuery } from "../../hooks/gather/queries";
import ReviewContent from "../../pagesComponents/review/ReviewContent";
import ReviewGatherSummary from "../../pagesComponents/review/ReviewGatherSummary";
import ReviewItemHeader from "../../pagesComponents/review/ReviewItemHeader";
import ReviewStatus from "../../pagesComponents/review/ReviewStatus";
import {
  prevPageUrlState,
  reviewContentIdState,
} from "../../recoil/previousAtoms";
import { REVIEW_DATA } from "../../storage/Review";
import { GatherLocation, GatherType } from "../../types/page/gather";
import { LocationFilterType } from "../../types/system";

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
  writer?: string;
  location: string;
}

function Review() {
  const router = useRouter();

  const [initialData, setInitialData] = useState<IReview[]>();
  const [reviewData, setReviewData] = useState<IReview[]>();
  const [category, setCategory] = useState<LocationFilterType>("전체");

  const prevPageUrl = useRecoilValue(prevPageUrlState);
  const reviewContentId = useRecoilValue(reviewContentIdState);

  const url = WEB_URL + router?.asPath;
  const temp = {
    name: "이승주",
    profileImage: null,
    avatar: { bg: 10, type: 9 },
  };

  const writers = {
    이승주: {
      name: "이승주",
      profileImage: null,
      avatar: { bg: 0, type: 11 },
    },
    서유진: { name: "서유진", profileImage: null, avatar: { bg: 3, type: 7 } },
    찬민: {
      name: "찬민",
      profileImage:
        "https://p.kakaocdn.net/th/talkp/wnUXvUROY2/jUp0CmCy3sXzVO8hEoLZhk/duaypz_640x640_s.jpg",
      avatar: null,
    },
    윤경: {
      name: "윤경",
      profileImage: null,
      avatar: { bg: 0, type: 8 },
    },
    재욱: {
      name: "재욱",
      profileImage:
        "https://p.kakaocdn.net/th/talkp/wn07WrT0Bp/xZrUl20KAKbNB3QKIvG4Bk/hjiiy1_640x640_s.jpg",
      avatar: null,
    },
    김석훈: {
      name: "김석훈",
      profileImage:
        "http://k.kakaocdn.net/dn/cWx5rA/btr7dOzI5TO/AW8kPq23hSHFF7TjSihJ91/img_640x640.jpg",
      avatar: null,
    },
    최지아: {
      name: "최지아",
      profileImage:
        "https://p.kakaocdn.net/th/talkp/woeoxF3Sok/CwC8U0RXEY4zM2nnOl7MN0/wxwkco_640x640_s.jpg",
      avatar: null,
    },
  };

  useGatherSummaryQuery({
    onSuccess(data) {
      const updatedReviewData = REVIEW_DATA.slice()
        .reverse()
        .map((review) => {
          const findItem = data.find((item) => item.id === review.id);
          return { ...review, summary: findItem || null };
        });
      setInitialData(updatedReviewData);
      setReviewData(updatedReviewData);
    },
  });

  useEffect(() => {
    if (category === "전체") setReviewData(initialData);
    else
      setReviewData(initialData.filter((item) => item.location === category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    if (reviewContentId) {
      const element = document.getElementById(`review${reviewContentId}`);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [reviewContentId, reviewData]);

  return (
    <>
      <Header
        title="모임 리뷰"
        url={prevPageUrl || "/gather"}
        isPrev={!!prevPageUrl}
      >
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
          <>
            <NavWrapper>
              <ButtonCheckNav
                buttonList={["전체", ...LOCATION_USE_ALL]}
                selectedButton={category}
                setSelectedButton={setCategory}
              />
            </NavWrapper>
            <Main>
              {reviewData?.map((item) => (
                <Item id={"review" + item.id} key={item.id}>
                  <ReviewItemHeader
                    writer={writers[item?.writer || "이승주"]}
                    date={item.date}
                  />
                  <ImageWrapper>
                    <ImageSlider imageContainer={item.images} type="review" />
                  </ImageWrapper>
                  {item.summary ? (
                    <ReviewGatherSummary summary={item.summary} />
                  ) : (
                    <Spacing />
                  )}
                  <ReviewContent text={item.text} />
                  <ReviewStatus temp={temp} />
                </Item>
              ))}
            </Main>
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div``;

const NavWrapper = styled.div`
  margin: var(--margin-md) var(--margin-sub);
`;

const Main = styled.main`
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`;

const Item = styled.div`
  margin-bottom: 60px;
`;

const Spacing = styled.div`
  height: var(--margin-max);
`;

export default Review;
