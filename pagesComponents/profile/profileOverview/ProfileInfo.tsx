import { Badge } from "@chakra-ui/react";
import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { BADGE_COLOR } from "../../../constants/contentsValue/badge";
import { POINT_SYSTEM_PLUS } from "../../../constants/contentsValue/pointSystem";
import { USER_ROLE } from "../../../constants/contentsValue/role";
import { LIKE_HEART } from "../../../constants/keys/localStorage";
import { getUserBadge } from "../../../helpers/userHelpers";
import {
  useAdminPointMutation,
  useAdminScoremMutation,
} from "../../../hooks/admin/mutation";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import { useInteractionLikeMutation } from "../../../hooks/interaction/mutations";
import { useStudyCheckRecordsQuery } from "../../../hooks/study/queries";
import {
  IInteractionLikeStorage,
  IInteractionSendLike,
} from "../../../types/interaction";
import { IUser } from "../../../types/user/user";

interface IProfileInfo {
  user: IUser;
}
function ProfileInfo({ user }: IProfileInfo) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [isConditionOk, setIsConditionOk] = useState(false);
  const [isHeartLoading, setIsHeartLoading] = useState(true);

  const userBadge = getUserBadge(user?.score, user?.uid);

  const status = USER_ROLE[user?.role];
  const storedLikeArr: IInteractionLikeStorage[] = JSON.parse(
    localStorage.getItem(LIKE_HEART)
  );

  const isHeart =
    storedLikeArr &&
    storedLikeArr.find(
      (who) =>
        dayjs(who?.date) > dayjs().subtract(3, "day") && who?.uid === user?.uid
    );

  const { mutate: sendHeart } = useInteractionLikeMutation({
    onSuccess() {
      completeToast("free", "좋아요 전송 완료");
    },
    onError: errorToast,
  });

  const { mutate: sendPoint } = useAdminPointMutation(user?.uid, {});
  const { mutate: sendScore } = useAdminScoremMutation(user?.uid);

  useStudyCheckRecordsQuery(dayjs().subtract(4, "day"), dayjs().add(1, "day"), {
    enabled: !isGuest,
    onSuccess(data) {
      data.forEach((study) => {
        study.arrivedInfoList.forEach((arrivedInfoList) => {
          const bothAttend = arrivedInfoList.arrivedInfo.filter(
            (item) => item.uid === user.uid || item.uid === session.uid
          );
          console.log(13, bothAttend);
          if (bothAttend.length >= 2) {
            setIsConditionOk(true);
          }
        });
      });
      setIsHeartLoading(false);
    },
  });

  const onClickHeart = () => {
    if (isGuest) {
      failToast("free", "게스트에게는 불가능합니다.");
      return;
    }

    let interval;
    const checkCondition = () => {
      if (isHeartLoading) return;
      clearInterval(interval);
      handleHeart();
    };

    interval = setInterval(checkCondition, 100);
  };

  const handleHeart = () => {
    if (!isConditionOk && user.birth.slice(2) !== dayjs().format("MMDD")) {
      failToast(
        "free",
        "최근 같은 스터디에 참여한 멤버 또는 생일인 인원에게만 보낼 수 있어요!"
      );
      return;
    }
    sendPoint(POINT_SYSTEM_PLUS.like.point);
    sendScore(POINT_SYSTEM_PLUS.like.score);
    localStorage.setItem(
      LIKE_HEART,
      JSON.stringify([
        storedLikeArr && [...storedLikeArr],
        { uid: user?.uid, date: dayjs() },
      ])
    );
    const data: IInteractionSendLike = {
      to: user?.uid,
      message: `${session?.user.name}님으로부터 좋아요를 받았어요!`,
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
              <Badge fontSize={12} colorScheme={BADGE_COLOR[userBadge]}>
                {userBadge}
              </Badge>
            </div>
            <span>{!isGuest ? status : "게스트"}</span>
          </ProfileName>
          {user && user?.uid !== session?.uid && (
            <>
              {isHeart ? (
                <HeartWrapper onClick={onClickHeart}>
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="xl"
                    color="var(--color-red)"
                  />
                </HeartWrapper>
              ) : (
                <HeartWrapper onClick={onClickHeart}>
                  <FontAwesomeIcon icon={faHeart} size="xl" />
                </HeartWrapper>
              )}
            </>
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
