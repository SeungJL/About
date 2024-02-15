import { Box, Button } from "@chakra-ui/react";
import { faEllipsis } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import KakaoShareBtn from "../../components/common/Icon/KakaoShareBtn";
import { MainLoading } from "../../components/common/loaders/MainLoading";
import ImageSlider from "../../components/dataViews/imageSlider/ImageSlider";
import Header from "../../components/layout/Header";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import { DEFAULT_IMAGE_URL } from "../../constants/image/imageUrl";
import { LOCATION_USE_ALL } from "../../constants/location";
import { WEB_URL } from "../../constants/system";
import { useErrorToast } from "../../hooks/custom/CustomToast";
import { useGatherAllSummaryQuery } from "../../hooks/gather/queries";
import ReviewContent from "../../pageTemplates/review/ReviewContent";
import ReviewGatherSummary from "../../pageTemplates/review/ReviewGatherSummary";
import ReviewItemHeader from "../../pageTemplates/review/ReviewItemHeader";
import ReviewStatus from "../../pageTemplates/review/ReviewStatus";
import {
  prevPageUrlState,
  reviewContentIdState,
} from "../../recoil/previousAtoms";
import { IReviewData, REVIEW_DATA } from "../../storage/Review";
import { IGatherLocation, IGatherType } from "../../types/page/gather";
import { LocationFilterType } from "../../types/system";

export interface IGatherSummary {
  title: string;
  type: IGatherType;
  location: IGatherLocation;
  date: string;
  id: number;
  place: LocationFilterType;
}

interface IReview extends IReviewData {
  summary?: IGatherSummary;
}

function Review() {
  const router = useRouter();
  const errorToast = useErrorToast();
  const [initialData, setInitialData] = useState<IReview[]>();
  const [reviewData, setReviewData] = useState<IReview[]>();
  const [category, setCategory] = useState<LocationFilterType>("전체");

  const prevPageUrl = useRecoilValue(prevPageUrlState);
  const [reviewContentId, setReviewContentId] =
    useRecoilState(reviewContentIdState);

  const [visibleCnt, setVisibleCnt] = useState(8);

  const url = WEB_URL + router?.asPath;

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
    김지훈: {
      name: "김지훈",
      profileImage: DEFAULT_IMAGE_URL,
    },
  };

  const { data: gatherAllData } = useGatherAllSummaryQuery({
    enabled: !initialData,
    onError: errorToast,
  });

  useEffect(() => {
    if (!gatherAllData) return;
    const reviewObject = gatherAllData.reduce((acc, summary) => {
      acc[summary.id] = summary;
      return acc;
    }, {});
    const updatedReviewData = REVIEW_DATA.slice()
      .reverse()
      .map((review) => {
        const findItem = reviewObject[review.id];
        return {
          ...review,
          place: findItem?.place ?? review.place,
          summary: findItem && { ...findItem },
        };
      });
    setInitialData(updatedReviewData);
    setReviewData(updatedReviewData);
  }, [gatherAllData]);

  useEffect(() => {
    if (!initialData) return;
    if (category === "전체") setReviewData(initialData);
    else {
      const filtered = initialData.filter(
        (item) => item.place === category || item.place === "전체"
      );
      setReviewData(filtered);
    }
  }, [category, initialData]);

  useEffect(() => {
    if (reviewContentId && reviewData) {
      const element = document.getElementById(`review${reviewContentId}`);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
    setReviewContentId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewContentId, reviewData]);

  const handleLoadMore = () => {
    setVisibleCnt((old) => old + 8);
  };

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
        {reviewData ? (
          <>
            <NavWrapper>
              <ButtonCheckNav
                buttonList={["전체", ...LOCATION_USE_ALL]}
                selectedButton={category}
                setSelectedButton={setCategory}
              />
            </NavWrapper>
            <Main>
              {reviewData.slice(0, visibleCnt).map((item) => (
                <Item id={"review" + item.id} key={item.id}>
                  <ReviewItemHeader
                    writer={writers[item?.writer || "이승주"]}
                    date={item.dateCreated}
                  />
                  <ImageWrapper>
                    <ImageSlider imageContainer={item.images} type="review" />
                  </ImageWrapper>
                  {item.summary ? (
                    <ReviewGatherSummary summary={item.summary} />
                  ) : (
                    <Spacing />
                  )}
                  {item?.text && <ReviewContent text={item.text} />}
                  <ReviewStatus temp={writers["이승주"]} />
                </Item>
              ))}
              {visibleCnt < reviewData.length && (
                <Button
                  onClick={handleLoadMore}
                  m="var(--gap-4)"
                  colorScheme="gray"
                  boxShadow="var(--shadow)"
                  color="var(--gray-3)"
                >
                  <Box mr="var(--gap-2)">더 보기</Box>
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              )}
            </Main>
          </>
        ) : (
          <MainLoading />
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin-top: var(--gap-1);
`;

const NavWrapper = styled.div`
  padding: var(--gap-2) var(--gap-3);
`;

const Main = styled.main`
  margin-top: var(--gap-3);
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`;

const Item = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;

const Spacing = styled.div`
  height: var(--gap-5);
`;

export default Review;
