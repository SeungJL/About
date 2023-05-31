import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styled from "styled-components";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";

import { IUser } from "../../../types/user";

function ProfileIconSm({ user }: { user: IUser | any }) {
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
    <Layout style={{ background: isAvatar && AVATAR_COLOR[avatarBg] }}>
      <Image
        src={isAvatar ? `${AVATAR_ICON[avatarType]}` : `${user?.profileImage}`}
        width={isAvatar ? 26 : 32}
        height={isAvatar ? 26 : 32}
        alt="ProfileIconXs"
        unoptimized={true}
        onError={onError}
      />
    </Layout>
  );
}

const Layout = styled.div`
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
`;

export default ProfileIconSm;
