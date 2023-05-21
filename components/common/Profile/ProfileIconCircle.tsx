import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import UserInfoModal from "../../../modals/user/UserInfoModal";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";
import { IUser } from "../../../types/user";

import ModalPortal from "../../ModalPortal";

function ProfileIconCircle({
  user,
  isSmall,
}: {
  user: IUser;
  isSmall?: boolean;
}) {
  const toast = useToast();
  const { data: session } = useSession();

  const avatarType = user?.avatar?.type;
  const avatarBg = user?.avatar?.bg;

  const isAvatar =
    avatarType !== null &&
    avatarType !== undefined &&
    avatarBg !== null &&
    avatarBg !== undefined;
  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://user-images.githubusercontent.com/84257439/235454314-22c679dc-e8ff-4ef9-b403-456d752b8589.png";
  };
  return (
    <>
      {user && (
        <Layout
          isSmall={isSmall}
          style={{ background: isAvatar ? AVATAR_COLOR[avatarBg] : null }}
        >
          <Image
            src={
              isAvatar ? `${AVATAR_ICON[avatarType]}` : `${user?.profileImage}`
            }
            width={isAvatar ? 38 : 48}
            height={isAvatar ? 38 : 48}
            alt="userProfileLg"
            unoptimized={true}
            onError={onError}
          />
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div<{ isSmall?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProfileIconCircle;
