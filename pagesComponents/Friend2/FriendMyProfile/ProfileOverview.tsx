import { Badge } from "@chakra-ui/react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { userBadgeScore } from "../../../libs/utils/userUtils";
import { IUser, USER_BADGES } from "../../../types/user";

interface IProfileOverview {
  user: IUser;
}
function ProfileOverview({ user }: IProfileOverview) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const userBadge = userBadgeScore(user?.score);
  return (
    <Layout>
      <Profile>
        <ProfileIcon user={user || session?.user} size="xl" />
        <ProfileInfo>
          <div>
            <span>{user?.name || session?.user.name}</span>
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
    </Layout>
  );
}

const Layout = styled.div``;
const Profile = styled.div`
  display: flex;
  justify-content: space-between;
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
const HeartWrapper = styled.div`
  margin-right: 14px;
`;

const Comment = styled.div`
  margin-left: 2px;
  margin-top: 14px;
  color: var(--font-h1);
  font-size: 12px;
  font-weight: 600;
`;

export default ProfileOverview;
