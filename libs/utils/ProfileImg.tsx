import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import UserInfoSm from "../../modals/UserInfoSm";
import { IUser } from "../../models/user";
import { isShowUserInfoSmState, modalContextState } from "../../recoil/atoms";

const ProfileImgLayout = styled.div`
  width: 45px;
  border-radius: 10px;
  overflow: hidden;
`;

export default function ProfileImg({ user }: { user: IUser }) {
  const setIsShowUserInfoSm = useSetRecoilState(isShowUserInfoSmState);

  const setModalContext = useSetRecoilState(modalContextState);
  const onProfileImgClicked = () => {
    setIsShowUserInfoSm(true);

    setModalContext((old) =>
      Object.assign(
        {
          ProfileImg: {
            user: user,
          },
        },
        old
      )
    );
  };
  return (
    <>
      <ProfileImgLayout onClick={onProfileImgClicked}>
        <img src={user.thumbnailImage} alt={user.name} />
      </ProfileImgLayout>
    </>
  );
}