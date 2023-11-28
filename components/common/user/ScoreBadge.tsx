import { Badge } from "@chakra-ui/react";
import { BADGE_COLOR } from "../../../constants/settingValue/badge";
import { getUserBadge } from "../../../helpers/userHelpers";

interface IScoreBadge {
  score: number;
  uid: string;
}

function ScoreBadge({ score, uid }: IScoreBadge) {
  const badge = getUserBadge(score, uid);
  return <Badge colorScheme={BADGE_COLOR[badge]}>{badge}</Badge>;
}

export default ScoreBadge;
