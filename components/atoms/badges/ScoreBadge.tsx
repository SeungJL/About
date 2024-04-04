import { Badge } from "@chakra-ui/react";
import { BADGE_COLOR_MAPPINGS } from "../../../constants/serviceConstants/badgeConstants";
// import { BADGE_COLOR } from "../../../constants/settingValue/badge";

import { getUserBadge } from "../../../libs/userEventLibs/userHelpers";

interface IScoreBadge {
  score: number;
  uid: string;
}

function ScoreBadge({ score, uid }: IScoreBadge) {
  const { badge } = getUserBadge(score, uid);
  return <Badge colorScheme={BADGE_COLOR_MAPPINGS[badge]}>{badge}</Badge>;
}

export default ScoreBadge;
