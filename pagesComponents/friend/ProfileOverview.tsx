import { useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { AVATAR_COLOR, AVATAR_ICON } from "../../storage/Avatar";
import { Badge, Button, useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userBadgeState } from "../../recoil/userAtoms";
import { IAttendence } from "../../types/studyDetails";
import { IUser, USER_BADGES } from "../../types/user";
import { userBadgeScore } from "../../libs/utils/userUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import DetailInfo from "./DetailInfo";
import ModalPortal from "../../components/ModalPortal";
import ProfileCard from "../../modals/friend/ProfileCard";
import NotCompletedModal from "../../modals/system/NotCompletedModal";
import ProfileIconLg from "../../components/common/Profile/ProfileIconLg";
import { useFailToast } from "../../components/common/CustomToast";

function ProfileOverview({ user }: { user?: IUser }) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const showGuestErrorToast = useFailToast();

  const [info, setInfo] = useState<IUser>(user);
  const [isFriend, setIsFriend] = useState(false);

  const [isProfileCard, setIsProfileCard] = useState(false);

  const avatarType = info?.avatar?.type;
  const avatarBg = info?.avatar?.bg;

  const isAvatar =
    avatarType !== null &&
    avatarType !== undefined &&
    avatarBg !== null &&
    avatarBg !== undefined;

  const userBadge = userBadgeScore(info?.score);

  const onClickCard = () => {
    if (isGuest) {
      showGuestErrorToast();
      return;
    }
    setIsProfileCard(true);
  };

  return (
    <>
      <Layout>
        <Profile>
          <ImageWrapper
            style={{ background: isAvatar ? AVATAR_COLOR[avatarBg] : null }}
          >
            <ProfileIconLg user={info} size={70} />
          </ImageWrapper>
          <ProfileInfo>
            <div>
              <span>{info?.name}</span>
              <Badge fontSize={12} colorScheme={USER_BADGES[userBadge?.badge]}>
                {userBadge?.badge}
              </Badge>
            </div>
            <span>{!isGuest ? "활동중" : "게스트"}</span>
          </ProfileInfo>
          {user && user?.uid !== session?.uid && (
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
          {user && user?.uid !== session?.uid ? (
            <Button
              backgroundColor="var(--color-mint)"
              color="white"
              size="sm"
              onClick={() => setIsFriend(true)}
            >
              친구신청
            </Button>
          ) : (
            <Button
              onClick={onClickCard}
              size="sm"
              border="1px solid var(--font-h6)"
            >
              내 프로필 카드
            </Button>
          )}
        </RelationBar>
      </Layout>
      {isProfileCard && (
        <ModalPortal setIsModal={setIsProfileCard}>
          <ProfileCard setIsModal={setIsProfileCard} />
        </ModalPortal>
      )}
      {isFriend && (
        <ModalPortal setIsModal={setIsFriend}>
          <NotCompletedModal setIsModal={setIsFriend} />
        </ModalPortal>
      )}
    </>
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
      margin-right: 8px;
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
  padding: 0 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  line-height: 2;
  > span:first-child {
    font-size: 11px;
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
  font-weight: 600;
`;

export default ProfileOverview;
