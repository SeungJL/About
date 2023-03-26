import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ModalPortal from "../ModalPortal";
import UserInfoSm from "../../modals/user/UserInfoSmModal";
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
        <img src={user?.profileImage} alt={user?.name} />
      </ProfileImgLayout>
      {isShowModal && (
        <ModalPortal closePortal={setIsShowModal}>
          <UserInfoSm user={user} setIsShowModal={setIsShowModal} />
        </ModalPortal>
      )}
    </>
  );
}
