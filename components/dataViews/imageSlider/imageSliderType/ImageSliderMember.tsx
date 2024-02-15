import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { dayjsToFormat } from "../../../../helpers/dateHelpers";
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../../recoil/transferDataAtoms";
import { IUser } from "../../../../types/user/user";
import HeartLikeIcon from "../../../common/Icon/HeartLikeIcon";
import ProfileIcon from "../../../common/user/Profile/ProfileIcon";
import { ImageContainer } from "../ImageSlider";

interface IImageSliderMember {
  imageContainer: ImageContainer;
}

function ImageSliderMember({ imageContainer }: IImageSliderMember) {
  const router = useRouter();
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const setUserData = useSetRecoilState(transferUserDataState);

  const onClickUser = (user: IUser) => {
    setUserData(user);
    router.push(`/profile/${user.uid}`);
    setBeforePage(router?.asPath);
  };

  const today = dayjsToFormat(dayjs(), "MMDD");
  const isBirth =
    imageContainer.length &&
    (imageContainer[0] as IUser).birth.slice(2) === today;

  return (
    <Swiper
      navigation
      style={{
        width: "100%",
        height: "auto",
      }}
      slidesPerView={7.6}
    >
      {(imageContainer as IUser[]).map((user, index) => {
        return (
          <SwiperSlide key={index}>
            <MemberItem>
              <ProfileWrapper onClick={() => onClickUser(user)}>
                <ProfileIcon user={user} size="xs" />
              </ProfileWrapper>
              <span>{user?.name}</span>
              {isBirth && (
                <HeartWrapper>
                  <HeartLikeIcon toUid={user.uid} />
                </HeartWrapper>
              )}
            </MemberItem>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

const MemberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    display: inline-block;
    margin-top: var(--gap-1);
    font-size: 10px;
  }
`;

const ProfileWrapper = styled.div``;

const HeartWrapper = styled.div`
  margin-top: 2px;
`;

export default ImageSliderMember;
