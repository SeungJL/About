import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { prevPageUrlState } from "../../../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../../../recoil/transferDataAtoms";
import { IUser } from "../../../../../types/user/user";
import ProfileIcon from "../../../../common/user/Profile/ProfileIcon";
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
    router.push(`/profile/${user.uid}}`);
    setBeforePage(router?.asPath);
  };
  return (
    <Swiper
      navigation
      style={{
        width: "100%",
        height: "auto",
      }}
      slidesPerView={7.6}
    >
      {(imageContainer as IUser[]).map((user, index) => (
        <SwiperSlide key={index}>
          <MemberItem onClick={() => onClickUser(user)}>
            <ProfileIcon user={user} size="xs" />
            <span>{user?.name}</span>
          </MemberItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

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

export default ImageSliderMember;
