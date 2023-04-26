import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../constants/design";
import UserInfoModal from "../../../modals/user/UserInfoModal";
import { IUser } from "../../../types/user";

import ModalPortal from "../../ModalPortal";

function ProfileIconLg({ user }: { user: IUser }) {
  const toast = useToast();
  const { data: session } = useSession();

  const avatarType = user?.avatar?.type;
  const avatarBg = user?.avatar?.bg;

  const isAvatar =
    avatarType !== null &&
    avatarType !== undefined &&
    avatarBg !== null &&
    avatarBg !== undefined;
  return (
    <>
      <Layout style={{ background: isAvatar && AVATAR_COLOR[avatarBg] }}>
        <Image
          src={
            isAvatar ? `${AVATAR_ICON[avatarType]}` : `${user?.profileImage}`
          }
          width={isAvatar ? 64 : 80}
          height={isAvatar ? 64 : 80}
          alt="userProfileLg"
          unoptimized={true}
        />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProfileIconLg;
