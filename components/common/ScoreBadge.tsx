import { Badge } from "@chakra-ui/react";
import { USER_BADGES } from "../../constants/convert";
import { getUserBadgeScore } from "../../helpers/userHelpers";

interface IScoreBadge {
  score: number;
  uid: string;
}

function ScoreBadge({ score, uid }: IScoreBadge) {
  const { badge } = getUserBadgeScore(score, uid);
  return <Badge colorScheme={USER_BADGES[badge]}>{badge}</Badge>;
}

export default ScoreBadge;
