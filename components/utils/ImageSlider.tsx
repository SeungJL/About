import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // for the pagination dots
import { Swiper, SwiperSlide } from "swiper/react";
import {
  prevPageUrlState,
  reviewContentIdState,
} from "../../recoil/previousAtoms";
import { transferUserDataState } from "../../recoil/transferDataAtoms";
import { IUser } from "../../types/user";
import { IImageSliderItem } from "../../types/utils";
import ProfileIcon from "../common/Profile/ProfileIcon";

SwiperCore.use([Navigation, Pagination]); // apply the Pagination module

interface IImageSlider {
  type: string;
  ImageContainer: string[] | IImageSliderItem[] | IUser[];
}

function ImageSlider({ type, ImageContainer }: IImageSlider) {
  const router = useRouter();
  const [isFull, setIsFull] = useState(false);
  const [fullImage, setFullImage] = useState("");
  const setReviewContentId = useSetRecoilState(reviewContentIdState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const setUserData = useSetRecoilState(transferUserDataState);
  const onClickImage = (image: string) => {
    setIsFull((old) => !old);
    setFullImage(image);
  };

  const onClickReviewItem = (id: number) => {
    if (id) setReviewContentId(id);
    router.push("review");
  };

  const onClickUser = (user: IUser) => {
    setUserData(user);
    router.push(`/profile/${user.uid}}`);
    setBeforePage(router?.asPath);
  };

  return (
    <>
      {ImageContainer && (
        <Layout isHeight={type === "review"}>
          {type === "point" ? (
            <Swiper
              navigation
              style={{
                width: "100%",
                height: "auto",
              }}
              slidesPerView={3.2}
            >
              {ImageContainer.map((image, index) => (
                <SwiperSlide key={index}>
                  <PointItem>
                    <Image
                      src={image}
                      alt={`Slide ${index}`}
                      width="100%"
                      height="100%"
                    />
                  </PointItem>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : ImageContainer?.length && type === "review" ? (
            <Swiper
              navigation
              pagination={true}
              modules={[Pagination]} // enable pagination
              style={{ width: "100%", height: "100%", background: "pink" }}
            >
              {ImageContainer?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`${image}`}
                    alt={`Slide ${index}`}
                    layout="fill"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : type === "gatherReviewNav" ? (
            <Swiper
              navigation
              style={{
                width: "100%",
                height: "auto",
              }}
              slidesPerView={4.6}
            >
              <SwiperSlide onClick={() => onClickReviewItem(0)}>
                <GatherReviewNavItem>
                  <div>
                    <FontAwesomeIcon
                      icon={faImage}
                      size="2x"
                      color="var(--color-mint)"
                    />
                  </div>
                  <span>리뷰</span>
                </GatherReviewNavItem>
              </SwiperSlide>
              {(ImageContainer as IImageSliderItem[]).map((item, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => onClickReviewItem(item.id)}
                >
                  <GatherReviewNavItem>
                    <div>
                      <Image
                        src={item.image}
                        alt={`Slide ${index}`}
                        width={54}
                        height={54}
                      />
                    </div>
                    <span>{item.title}</span>
                  </GatherReviewNavItem>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : type === "member" ? (
            <Swiper
              navigation
              style={{
                width: "100%",
                height: "auto",
              }}
              slidesPerView={7.6}
            >
              {(ImageContainer as IUser[]).map((user, index) => (
                <SwiperSlide key={index}>
                  <MemberItem onClick={() => onClickUser(user)}>
                    <ProfileIcon user={user} size="xs" />
                    <span>{user?.name}</span>
                  </MemberItem>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div<{ isHeight: boolean }>`
  text-align: center;
  width: 100%;
  height: ${(props) => (props.isHeight ? "100%" : "auto")};
`;

const PointItem = styled.div`
  background-color: var(--font-h7);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius-main);
`;

const GatherReviewNavItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 68px;
  align-items: center;

  > div {
    border-radius: var(--border-radius-main);
    width: 52px;
    height: 52px;
    overflow: hidden;
    background-color: var(--font-h6);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  }
  > span {
    font-size: 10px;
  }
`;

const MemberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    display: inline-block;
    margin-top: var(--margin-min);
    font-size: 10px;
  }
`;

export default ImageSlider;
