import { Badge } from "@chakra-ui/react";
import { faHeart } from "@fortawesome/pro-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { USER_BADGES } from "../../../constants/convert";
import { getUserBadgeScore } from "../../../helpers/userHelpers";
import { IUser } from "../../../types/user/user";

interface IProfileInfo {
  user: IUser;
}
function ProfileInfo({ user }: IProfileInfo) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const userBadge = getUserBadgeScore(user?.score);

  const status =
    user?.role === "human"
      ? "수습멤버"
      : user?.role === "manager"
      ? "운영진"
      : user?.role === "member"
      ? "동아리원"
      : user?.role === "previliged"
      ? "관리자"
      : user?.role === "resting"
      ? "휴식멤버"
      : "외부인";

  return (
    <>
      <Layout>
        <Profile>
          <ProfileIcon user={user || "guest"} size="xl" />
          <ProfileName>
            <div>
              <span>{user?.name || session?.user.name}</span>
              <Badge fontSize={12} colorScheme={USER_BADGES[userBadge?.badge]}>
                {userBadge?.badge}
              </Badge>
            </div>
            <span>{!isGuest ? status : "게스트"}</span>
          </ProfileName>
          {user && user?.uid !== session?.uid && (
            <HeartWrapper>
              <FontAwesomeIcon icon={faHeart} size="xl" />
            </HeartWrapper>
          )}
        </Profile>
        <Comment>{user?.comment}</Comment>
      </Layout>
    </>
  );
}

const Layout = styled.div``;
const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileName = styled.div`
  margin-left: var(--margin-sub);
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
      margin-right: var(--margin-md);
    }
  }
  > span:last-child {
    font-size: 12px;
    color: var(--font-h3);
  }
`;
const HeartWrapper = styled.div`
  margin-right: var(--margin-min);
`;

const Comment = styled.div`
  margin-left: var(--margin-min);
  margin-top: var(--margin-sub);
  color: var(--font-h1);
  font-size: 12px;
  font-weight: 600;
`;

export default ProfileInfo;
