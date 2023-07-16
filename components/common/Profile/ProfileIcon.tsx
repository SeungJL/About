import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { ICON_SIZE } from "../../../constants/design";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";
import { Size } from "../../../types/ui";

import { IUser } from "../../../types/user";

interface IProfileIcon {
  user: IUser | "guest";
  size?: Size;
}

function ProfileIcon({ user, size }: IProfileIcon) {
  const avatarType = (user as IUser)?.avatar?.type;
  const avatarBg = (user as IUser)?.avatar?.bg;
  const isAvatar =
    Boolean(avatarType >= 0 && avatarBg >= 0) || user === "guest";

  const iconSize = ICON_SIZE[size];

  const [isError, setIsError] = useState(false);

  const imageUrl = isAvatar
    ? `${AVATAR_ICON[avatarType]}`
    : `${(user as IUser)?.profileImage}`;

  return (
    <>
      {user && (
        <Layout
          avatarBg={
            user === "guest" || isError
              ? AVATAR_COLOR[4]
              : isAvatar && AVATAR_COLOR[avatarBg]
          }
          size={iconSize}
        >
          <Image
            src={isError ? AVATAR_ICON[0] : imageUrl}
            width={isError || isAvatar ? 0.8 * iconSize : iconSize}
            height={isError || isAvatar ? 0.8 * iconSize : iconSize}
            alt="ProfileIcon"
            unoptimized={true}
            onError={() => setIsError(true)}
          />
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div<{ avatarBg: string; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.avatarBg || "white"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default ProfileIcon;
