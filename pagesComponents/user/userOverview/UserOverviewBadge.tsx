import { Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { USER_BADGES } from "../../../constants/convert";
import { getUserBadgeScore } from "../../../helpers/userHelpers";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { isGuestState } from "../../../recoil/userAtoms";
import { IUserBadge } from "../../../types/user/user";

function UserOverviewBadge() {
  const isGuest = useRecoilValue(isGuestState);
  const [badge, setBadge] = useState<IUserBadge>();

  const { data: userInfo } = useUserInfoQuery();

  useEffect(() => {
    if (isGuest) {
      setBadge({ badge: "아메리카노", color: USER_BADGES["아메리카노"] });
      return;
    }
    const badge = getUserBadgeScore(userInfo.score, userInfo.uid).badge;
    setBadge({
      badge,
      color: USER_BADGES[badge],
    });
  }, [isGuest, userInfo]);

  return (
    <Badge fontSize={12} colorScheme={badge?.color}>
      {badge?.badge}
    </Badge>
  );
}

export default UserOverviewBadge;