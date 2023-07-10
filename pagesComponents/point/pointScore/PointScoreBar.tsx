import { Badge, Progress } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import { useScoreQuery } from "../../../hooks/user/pointSystem/queries";
import { getUserBadgeScore } from "../../../libs/utils/userUtils";
import BadgeInfoModal from "../../../modals/store/badgeInfoModal/BadgeInfoModal";
import { userBadgeState } from "../../../recoil/userAtoms";
import { USER_BADGES } from "../../../types/user";

interface IPointScoreBar {
  myPoint: number;
}

function PointScoreBar({ myPoint }: IPointScoreBar) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [userBadge, setUserBadge] = useRecoilState(userBadgeState);
  const [isBadgeInfoModal, setIsBadgeInfoModal] = useState(false);
  const [scoreInfo, setScoreInfo] = useState({
    value: 0,
    nextBadge: { badge: null, color: "" },
    scoreGap: 30,
    nextScore: 30,
  });
  useScoreQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const { badge, badgeScore, nextBadge, gap, nextScore } =
        getUserBadgeScore(data.score);

      setUserBadge({ badge, color: USER_BADGES[badge] });
      setScoreInfo({
        value: badgeScore,
        nextBadge: { badge: nextBadge, color: USER_BADGES[nextBadge] },
        scoreGap: gap,
        nextScore,
      });
    },
  });

  return (
    <>
      <Layout>
        <Grade>
          <div>
            <Badge marginRight="6px" colorScheme={userBadge.color}>
              {userBadge.badge}
            </Badge>
            <span style={{ color: userBadge.color }}>{myPoint || "0"}점</span>
            <IconWrapper onClick={() => setIsBadgeInfoModal(true)}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </IconWrapper>
          </div>
          {userBadge?.badge !== "에스프레소" && (
            <div>
              <span style={{ color: scoreInfo.nextBadge.color }}>
                {scoreInfo.nextScore}점
              </span>
              <Badge
                colorScheme={scoreInfo.nextBadge.color || "orange"}
                marginLeft="6px"
              >
                {scoreInfo.nextBadge.badge || "라떼"}
              </Badge>
            </div>
          )}
        </Grade>
        <Progress
          value={(scoreInfo.value / scoreInfo.scoreGap) * 100}
          size="xs"
          color="var(--font-h4)"
        />
      </Layout>
      {isBadgeInfoModal && (
        <ModalPortal setIsModal={setIsBadgeInfoModal}>
          <BadgeInfoModal setIsModal={setIsBadgeInfoModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  margin-bottom: 12px;
`;
const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    > span {
      font-size: 12px;
    }
  }
`;

const IconWrapper = styled.div`
  color: var(--font-h2);
  font-size: 14px;
  margin-left: 8px;
`;

export default PointScoreBar;
