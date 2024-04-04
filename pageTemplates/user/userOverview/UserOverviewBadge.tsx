import { Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BADGE_COLOR } from "../../../constants/settingValue/badge";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { getUserBadge } from "../../../libs/userEventLibs/userHelpers";
import { IUserBadge } from "../../../types2/userTypes/userInfoTypes";

function UserOverviewBadge() {
  const [badge, setBadge] = useState<IUserBadge>();

  const { data: userInfo } = useUserInfoQuery();

  useEffect(() => {
    const { badge } = getUserBadge(userInfo.score, userInfo.uid);
    setBadge({
      badge,
      color: BADGE_COLOR[badge],
    });
  }, [userInfo]);

  return (
    <Badge fontSize={12} colorScheme={badge?.color}>
      {badge?.badge}
    </Badge>
  );
}

export default UserOverviewBadge;
