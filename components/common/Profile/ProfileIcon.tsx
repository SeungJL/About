import Image from "next/image";
import styled from "styled-components";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";
import { size } from "../../../types/ui";
import { IUser } from "../../../types/user";
import { ISessionUser } from "../../../types/user/session";

function ProfileIcon({
  user,
  size,
}: {
  user: IUser | ISessionUser;
  size?: size;
}) {
  const avatarType = (user as IUser)?.avatar?.type;
  const avatarBg = (user as IUser)?.avatar?.bg;
  const isAvatar = Boolean(avatarType && avatarBg);

  const sizeMatching = {
    xl: 70,
    lg: 60,
    md: 50,
    sm: 40,
    xs: 30,
  };

  const iconSize = sizeMatching[size];

  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://user-images.githubusercontent.com/84257439/235454314-22c679dc-e8ff-4ef9-b403-456d752b8589.png";
  };
  console.log(isAvatar);
  return (
    <>
      {user && (
        <Layout avatarBg={isAvatar && AVATAR_COLOR[avatarBg]} size={iconSize}>
          <Image
            src={
              isAvatar
                ? `${AVATAR_ICON[avatarType]}`
                : `${
                    (user as IUser)?.profileImage ||
                    (user as ISessionUser)?.image
                  }`
            }
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
