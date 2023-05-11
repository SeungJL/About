import { useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { AVATAR_COLOR, AVATAR_ICON } from "../../storage/Avatar";
import { Badge } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userBadgeState } from "../../recoil/userAtoms";
function MyProfile() {
  const { data: info } = useUserInfoQuery();
  const avatarType = info?.avatar?.type;
  const avatarBg = info?.avatar?.bg;

  const isAvatar =
    avatarType !== null &&
    avatarType !== undefined &&
    avatarBg !== null &&
    avatarBg !== undefined;

  const userBadge = useRecoilValue(userBadgeState);
  console.log(userBadge);
  return (
    <Layout>
      <Profile>
        <ProfileInfo>
          <div>
            <span>{info?.name}</span>
            <Badge fontSize={12} colorScheme={userBadge?.color}>
              {userBadge?.badge}
            </Badge>
          </div>
        </ProfileInfo>
        <ImageWrapper
          style={{ background: isAvatar ? AVATAR_COLOR[avatarBg] : null }}
        >
          <Image
            src={
              isAvatar ? `${AVATAR_ICON[avatarType]}` : `${info?.profileImage}`
            }
            width={isAvatar ? 64 : 80}
            height={isAvatar ? 64 : 80}
            alt="userProfileLg"
            unoptimized={true}
          />
        </ImageWrapper>
      </Profile>
      <Friend></Friend>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 14px;
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Friend = styled.div``;

export default MyProfile;
