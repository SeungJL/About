import { Badge } from "@chakra-ui/react";
import { faHeart } from "@fortawesome/pro-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { USER_BADGES } from "../../../constants/convert";
import { getRole } from "../../../helpers/converterHelpers";
import { getUserBadgeScore } from "../../../helpers/userHelpers";
import { useCompleteToast, useErrorToast } from "../../../hooks/CustomToast";
import { useInteractionLikeMutation } from "../../../hooks/interaction/mutations";
import { IInteractionSendLike } from "../../../types/interaction";
import { IUser } from "../../../types/user/user";

interface IProfileInfo {
  user: IUser;
}
function ProfileInfo({ user }: IProfileInfo) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const userBadge = getUserBadgeScore(user?.score, user?.uid);

  const status = getRole(user?.role);

  const { mutate: sendHeart } = useInteractionLikeMutation({
    onSuccess() {
      completeToast("free", "전송 완료");
    },
    onError: errorToast,
  });

  const onClickHeart = () => {
    const data: IInteractionSendLike = {
      to: user?.uid,
      message: `${session?.user.name}님으로 부터 좋아요를 받았어요!`,
    };
    sendHeart(data);
  };

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
            <HeartWrapper onClick={onClickHeart}>
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
