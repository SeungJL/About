import { Badge, Progress } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BADGE_COLOR, BADGE_INFO } from "../../../constants/settingValue/badge";
import { SCHEME_TO_COLOR } from "../../../constants/styles";
import { getUserBadge } from "../../../helpers/userHelpers";
import BadgeInfoModal from "../../../modals/store/badgeInfoModal/BadgeInfoModal";
import { UserBadge } from "../../../types/user/user";

interface IPointScoreBar {
  myScore: number;
  hasQuestion?: boolean;
}

function PointScoreBar({ myScore, hasQuestion = true }: IPointScoreBar) {
  const { data: session } = useSession();

  const [userBadge, setUserBadge] = useState<{
    badge: UserBadge;
    nextBadge: UserBadge;
  }>({ badge: null, nextBadge: null });
  const [isBadgeModal, setIsBadgeModal] = useState(false);

  useEffect(() => {
    if (myScore === 0) {
      setUserBadge({ badge: "아메리카노", nextBadge: "라떼" });
      return;
    }
    const { badge, nextBadge } = getUserBadge(myScore, session?.uid as string);
    setUserBadge({ badge, nextBadge });
  }, [myScore, session?.uid]);

  const { badge, nextBadge } = userBadge;

  const badgeColor = BADGE_COLOR[userBadge.badge];

  const getBadgePoint = () => {
    for (let i = 0; i < BADGE_INFO.length; i++) {
      const badgeInfo = BADGE_INFO[i];
      if (badgeInfo.badge === nextBadge) {
        return {
          nextBadgePoint: badgeInfo.minScore,
          badgeGap: badgeInfo.minScore - BADGE_INFO[i - 1].minScore,
        };
      }
    }
  };
  const { nextBadgePoint, badgeGap } = getBadgePoint() || {};

  return (
    <>
      <Layout>
        <Grade>
          <div>
            <Badge
              fontSize="14px"
              marginRight="var(--margin-md)"
              colorScheme={badgeColor}
            >
              {badge}
            </Badge>
            <BadgeName color={SCHEME_TO_COLOR[badgeColor] || badgeColor}>
              {myScore}점
            </BadgeName>
            {hasQuestion && (
              <IconWrapper onClick={() => setIsBadgeModal(true)}>
                <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
              </IconWrapper>
            )}
          </div>
          {nextBadge && (
            <div>
              <BadgeName color={BADGE_COLOR[nextBadge]}>
                {nextBadgePoint}점
              </BadgeName>
              <Badge
                fontSize="14px"
                colorScheme={BADGE_COLOR[nextBadge]}
                marginLeft="6px"
              >
                {nextBadge}
              </Badge>
            </div>
          )}
        </Grade>
        <Progress
          value={(1 - (nextBadgePoint - myScore) / badgeGap) * 100}
          height="12px"
          colorScheme="mintTheme"
          hasStripe
        />
      </Layout>

      {isBadgeModal && <BadgeInfoModal setIsModal={setIsBadgeModal} />}
    </>
  );
}

const Layout = styled.div`
  margin-bottom: var(--margin-sub);
`;
const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--margin-sub);
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
`;

const BadgeName = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 600;
`;

const IconWrapper = styled.button`
  color: var(--font-h2);
  font-size: 14px;
  margin-left: var(--margin-md);
`;

export default PointScoreBar;
