import { useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { AVATAR_COLOR, AVATAR_ICON } from "../../storage/Avatar";
import { Badge, Button } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userBadgeState } from "../../recoil/userAtoms";
import { IAttendence } from "../../types/studyDetails";
import { IUser, USER_BADGES } from "../../types/user";
import { userBadgeScore } from "../../libs/utils/userUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import DetailInfo from "./DetailInfo";

function ProfileOverview({ user }: { user?: IUser }) {
  const { data: session } = useSession();

  const [info, setInfo] = useState<IUser>(user);

  useUserInfoQuery({
    enabled: !user,
    onSuccess(data) {
      setInfo(data);
    },
  });

  const avatarType = info?.avatar?.type;
  const avatarBg = info?.avatar?.bg;

  const isAvatar =
    avatarType !== null &&
    avatarType !== undefined &&
    avatarBg !== null &&
    avatarBg !== undefined;

  const userBadge = userBadgeScore(info?.score);

  return (
    <Layout>
      <Profile>
        <ImageWrapper
          style={{ background: isAvatar ? AVATAR_COLOR[avatarBg] : null }}
        >
          {info && (
            <Image
              src={
                isAvatar
                  ? `${AVATAR_ICON[avatarType]}`
                  : `${info?.profileImage}`
              }
              width={isAvatar ? 56 : 70}
              height={isAvatar ? 56 : 70}
              alt="userProfileLg"
              unoptimized={true}
            />
          )}
        </ImageWrapper>
        <ProfileInfo>
          <div>
            <span>{info?.name}</span>
            <Badge fontSize={12} colorScheme={USER_BADGES[userBadge?.badge]}>
              {userBadge?.badge}
            </Badge>
          </div>
          <span>활동중</span>
        </ProfileInfo>
        {user?.uid === session?.uid ? (
          <Button size="sm" border="1px solid var(--font-h6)">
            내 프로필 카드
          </Button>
        ) : (
          <HeartWrapper>
            <FontAwesomeIcon icon={faHeart} size="xl" />
          </HeartWrapper>
        )}
      </Profile>

      <Comment>{user?.comment}</Comment>

      <RelationBar>
        <div>
          <RelationItem>
            <span>친구</span>
            <span>0</span>
          </RelationItem>
          <RelationItem>
            <span>좋아요</span>
            <span>0</span>
          </RelationItem>
          <RelationItem>
            <span>활동</span>
            <span>0</span>
          </RelationItem>
        </div>
        <Button backgroundColor="var(--color-mint)" color="white" size="sm">
          친구신청
        </Button>
      </RelationBar>
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
  align-items: center;
  justify-content: space-between;
  > div:first-child {
    display: flex;
  }
`;

const RelationItem = styled.div`
  width: max-content;
  padding: 0 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  line-height: 2;
  > span:first-child {
    font-size: 10px;
  }
  > span:last-child {
    font-size: 11px;
    font-weight: 600;
  }
`;

const HeartWrapper = styled.div`
  margin-right: 14px;
`;

const Comment = styled.span`
  margin-left: 2px;
  margin-top: 14px;
  color: var(--font-h1);
  font-size: 12px;
`;

export default ProfileOverview;
