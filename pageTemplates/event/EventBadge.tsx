import { Box } from "@chakra-ui/react";
import { faLock, faLockOpen } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AlertNotCompletedModal from "../../components2/AlertNotCompletedModal";
import IconButtonColBlock, {
  IIconButtonColBlockProps,
} from "../../components2/atoms/blocks/IconButtonColBlock";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import BlockSlider from "../../components2/organisms/sliders/BlockSlider";
import { BADGE_INFO, EVENT_BADGE } from "../../constants/settingValue/badge";
import {
  EVENT_BADGE_딸기스무디,
  EVENT_BADGE_라벤더,
  EVENT_BADGE_민트초코,
} from "../../constants/storage/eventBadgeUser";
import { useUserInfoQuery } from "../../hooks/user/queries";

interface IEventBadge {}
export default function EventBadge({}: IEventBadge) {
  const { data: userInfo } = useUserInfoQuery();
  const score = userInfo?.score;
  const [isModal, setIsModal] = useState(false);
  const blockArr: IIconButtonColBlockProps[] = BADGE_INFO.map((badge, idx) => {
    const hasBadge = score >= badge.minScore;
    return {
      icon: hasBadge ? (
        <FontAwesomeIcon icon={faLockOpen} color="var(--color-orange)" />
      ) : (
        <FontAwesomeIcon icon={faLock} color="var(--gray-3)" />
      ),
      title: badge.badge,
      buttonProp: {
        text: `${(idx + 1) * 10} POINT`,
        func: () => setIsModal(true),
      },
      disabled: !hasBadge,
    };
  });

  const eventArr: IIconButtonColBlockProps[] = EVENT_BADGE.map((badge) => {
    const hasBadge =
      badge === "딸기스무디"
        ? EVENT_BADGE_딸기스무디.includes(userInfo?.uid)
        : badge === "라벤더"
        ? EVENT_BADGE_라벤더.includes(userInfo?.uid)
        : badge === "민트초코"
        ? EVENT_BADGE_민트초코.includes(userInfo?.uid)
        : false;

    return {
      icon: !hasBadge ? (
        <FontAwesomeIcon icon={faLock} color="var(--gray-3)" />
      ) : (
        <FontAwesomeIcon icon={faLockOpen} color="var(--color-orange)" />
      ),
      title: badge,
      buttonProp: {
        text: " 100 POINT",
        func: () => setIsModal(true),
      },
      disabled: !hasBadge,
    };
  });

  const BlocksComponents = [...blockArr, ...eventArr].map((block) => (
    <IconButtonColBlock props={block} />
  ));

  return (
    <>
      <SectionBar title="배지를 해금하고 포인트를 받아봐요!" size="md" />
      <Box py="16px" pl="16px">
        <BlockSlider blocks={BlocksComponents} slidesPerView={2.4} />
      </Box>

      {isModal && <AlertNotCompletedModal setIsModal={setIsModal} />}
    </>
  );
}
