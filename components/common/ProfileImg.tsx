import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../libs/utils/ModalPortal";
import UserInfoSm from "../../modals/user/UserInfoSm";
import { IUser } from "../../models/user";
import {
  isShowUserInfoSmState,
  modalContextState,
} from "../../recoil/modalAtoms";

const ProfileImgLayout = styled.div`
  width: 45px;
  border-radius: 10px;
  overflow: hidden;
`;

export default function ProfileImg({ user }: { user: IUser }) {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <ProfileImgLayout onClick={() => setIsShowModal(true)}>
        <img src={user?.thumbnailImage} alt={user?.name} />
      </ProfileImgLayout>
      {isShowModal && (
        <ModalPortal closePortal={setIsShowModal}>
          <UserInfoSm user={user} setIsShowModal={setIsShowModal} />
        </ModalPortal>
      )}
    </>
  );
}
