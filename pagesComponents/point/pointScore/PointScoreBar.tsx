import { Badge, Progress } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/modal/ModalPortal";
import { BADGE_COLOR, BADGE_INFO, EVENT_BADGE } from "../../../constants/badge";
import { SCHEME_TO_COLOR } from "../../../constants/system";
import { getUserBadge } from "../../../helpers/userHelpers";
import BadgeInfoModal from "../../../modals/store/badgeInfoModal/BadgeInfoModal";
import { UserBadge } from "../../../types/user/user";

interface IPointScoreBar {
  myScore: number;
}

function PointScoreBar({ myScore }: IPointScoreBar) {
  const { data: session } = useSession();

  const [userBadge, setUserBadge] = useState<UserBadge>();
  const [isBadgeModal, setIsBadgeModal] = useState(false);

  useEffect(() => {
    if (myScore === 0) {
      setUserBadge("아메리카노");
      return;
    }
    const badge = getUserBadge(myScore, session?.uid as string);
    setUserBadge(badge);
  }, [myScore, session?.uid]);

  if (!userBadge) return null;

  const badgeInfo = BADGE_INFO.find((info) => info.badge === userBadge);
  const nextBadgeInfo = BADGE_INFO[BADGE_INFO.findIndex(() => badgeInfo) + 1];

  const badgeColor = BADGE_COLOR[userBadge];
  const nextBadgeColor = BADGE_COLOR[nextBadgeInfo?.badge];

  const badgeGap = nextBadgeInfo?.minScore - badgeInfo?.minScore;
  const remainingScore = nextBadgeInfo?.minScore - myScore;

  return (
    <>
      {userBadge && (
        <Layout>
          <Grade>
            <div>
              <Badge marginRight="var(--margin-md)" colorScheme={badgeColor}>
                {userBadge}
              </Badge>
              <BadgeName color={SCHEME_TO_COLOR[badgeColor] || badgeColor}>
                {myScore}점
              </BadgeName>
              <IconWrapper onClick={() => setIsBadgeModal(true)}>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </IconWrapper>
            </div>
            {![...EVENT_BADGE, BADGE_INFO.slice(-1)[0]].includes(userBadge) && (
              <div>
                <BadgeName color={nextBadgeColor}>
                  {nextBadgeInfo.minScore}점
                </BadgeName>
                <Badge colorScheme={nextBadgeColor} marginLeft="6px">
                  {nextBadgeInfo.badge}
                </Badge>
              </div>
            )}
          </Grade>
          <Progress
            value={(remainingScore / badgeGap) * 100}
            size="xs"
            color="var(--font-h4)"
          />
        </Layout>
      )}
      {isBadgeModal && (
        <ModalPortal setIsModal={setIsBadgeModal}>
          <BadgeInfoModal setIsModal={setIsBadgeModal} />
        </ModalPortal>
      )}
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
    > span {
      font-size: 12px;
    }
  }
`;

const BadgeName = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const IconWrapper = styled.div`
  color: var(--font-h2);
  font-size: 14px;
  margin-left: var(--margin-md);
`;

export default PointScoreBar;
