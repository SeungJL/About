import Image from "next/image";
import styled from "styled-components";
import { DEFAULT_IMAGE_URL } from "../../../constants/default";
import { ICON_SIZE } from "../../../constants/design";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";
import { size } from "../../../types/ui";
import { IUser } from "../../../types/user";

interface IProfileIcon {
  user: IUser | "guest";
  size?: size;
}

function ProfileIcon({ user, size }: IProfileIcon) {
  const avatarType = (user as IUser)?.avatar?.type;
  const avatarBg = (user as IUser)?.avatar?.bg;
  const isAvatar = Boolean(avatarType && avatarBg) || user === "guest";
  const iconSize = ICON_SIZE[size];

  const handeErrorImage = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = DEFAULT_IMAGE_URL;
  };

  const imageUrl = isAvatar
    ? `${AVATAR_ICON[avatarType]}`
    : `${(user as IUser)?.profileImage}`;

  return (
    <>
      {user && (
        <Layout
          avatarBg={
            user === "guest"
              ? AVATAR_COLOR[0]
              : isAvatar && AVATAR_COLOR[avatarBg]
          }
          size={iconSize}
        >
          <Image
            src={imageUrl}
            width={isAvatar ? 0.8 * iconSize : iconSize}
            height={isAvatar ? 0.8 * iconSize : iconSize}
            alt="ProfileIcon"
            unoptimized={true}
            onError={handeErrorImage}
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
