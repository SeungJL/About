import Image from "next/image";
import styled from "styled-components";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";
import { size } from "../../../types/ui";
import { IUser } from "../../../types/user";

function ProfileIcon({ user, size }: { user: IUser; size?: size }) {
  const avatarType = user?.avatar?.type;
  const avatarBg = user?.avatar?.bg;
  const isAvatar = Boolean(avatarType && avatarBg);

  const sizeMatching = {
    xl: 70,
  };

  const iconSize = sizeMatching[size];

  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://user-images.githubusercontent.com/84257439/235454314-22c679dc-e8ff-4ef9-b403-456d752b8589.png";
  };

  return (
    <>
      {user && (
        <Layout avatarBg={isAvatar && AVATAR_COLOR[avatarBg]} size={iconSize}>
          <Image
            src={
              isAvatar ? `${AVATAR_ICON[avatarType]}` : `${user?.profileImage}`
            }
            // width={isAvatar ? 32 : 40}
            // height={isAvatar ? 32 : 40}
            width={isAvatar ? 0.8 * iconSize : iconSize}
            height={isAvatar ? 0.8 * iconSize : iconSize}
            alt="ProfileIcon"
            unoptimized={true}
            onError={onError}
          />
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div<{ avatarBg: string; size: size }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.avatarBg || "white"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProfileIcon;
