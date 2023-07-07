import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { getUserBadgeScore } from "../../libs/utils/userUtils";
import { USER_BADGES } from "../../types/user";

interface IScoreBadge {
  score: number;
}

function ScoreBadge({ score }: IScoreBadge) {
  const { badge } = getUserBadgeScore(score);
  return <Badge colorScheme={USER_BADGES[badge]}>{badge}</Badge>;
}

const Layout = styled.div``;

export default ScoreBadge;
