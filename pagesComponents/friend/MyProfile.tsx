import { useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { AVATAR_COLOR, AVATAR_ICON } from "../../storage/Avatar";
import { Badge, Button } from "@chakra-ui/react";
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

  return (
    <Layout>
      <Profile>
        <ImageWrapper
          style={{ background: isAvatar ? AVATAR_COLOR[avatarBg] : null }}
        >
          <Image
            src={
              isAvatar ? `${AVATAR_ICON[avatarType]}` : `${info?.profileImage}`
            }
            width={isAvatar ? 56 : 70}
            height={isAvatar ? 56 : 70}
            alt="userProfileLg"
            unoptimized={true}
          />
        </ImageWrapper>
        <ProfileInfo>
          <div>
            <span>{info?.name}</span>
            <Badge fontSize={12} colorScheme={userBadge?.color}>
              {userBadge?.badge}
            </Badge>
          </div>
          <span>활동중</span>
        </ProfileInfo>
        <Button size="sm" border="1px solid var(--font-h6)">
          내 프로필 카드
        </Button>
      </Profile>
      <RelationBar>
        <RelationItem>
          <span>3</span>
          <span>친구</span>
        </RelationItem>
        <RelationItem>
          <span>2</span>
          <span>좋아요</span>
        </RelationItem>
        <RelationItem>
          <span>2</span>
          <span>칭찬</span>
        </RelationItem>
      </RelationBar>

      <Friend>
        <span>내 친구</span>
      </Friend>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
`;

const ProfileInfo = styled.div`
  margin-left: 12px;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  > div:first-child {
    display: flex;
    align-items: center;
    > span:first-child {
      font-size: 16px;
      font-weight: 600;
      margin-right: 6px;
    }
  }
  > span:last-child {
    font-size: 12px;
    color: var(--font-h3);
  }
`;

const RelationBar = styled.div`
  display: flex;
  margin-top: 20px;
  display: flex;
  height: 64px;

  justify-content: space-between;
  margin-bottom: 8px;
`;

const RelationItem = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  > span:first-child {
    font-weight: 700;
    font-size: 16px;
  }
  > span:last-child {
    font-size: 12px;
  }
`;

const Friend = styled.div`
  height: 120px;
  background-color: var(--font-h7);
  padding: 4px 8px;
  border-radius: var(--border-radius);
  border: 1px solid var(--font-h6);
  > span:first-child {
    color: var(--font-h3);
  }
`;

export default MyProfile;
