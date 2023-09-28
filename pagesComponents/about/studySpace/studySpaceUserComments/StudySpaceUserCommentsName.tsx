import { faCircleHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { POINT_SYSTEM_PLUS } from "../../../../constants/contentsValue/pointSystem";
import { LIKE_HEART } from "../../../../constants/keys/localStorage";
import { LIKE_HEART_PERIOD } from "../../../../constants/settingValue/localStorage";
import { pushArrToLocalStorage } from "../../../../helpers/storageHelpers";
import { useAdminAboutPointMutation } from "../../../../hooks/admin/mutation";
import { useCompleteToast, useErrorToast } from "../../../../hooks/CustomToast";
import { useInteractionLikeMutation } from "../../../../hooks/interaction/mutations";
import { IInteractionLikeStorage } from "../../../../types/interaction";
interface IStudySpaceUserCommentsName {
  name: string;
  isArrivedCondition: boolean;
  uid: string;
}

function StudySpaceUserCommentsName({
  uid,
  name,
  isArrivedCondition,
}: IStudySpaceUserCommentsName) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const [isHeart, setIsHeart] = useState(false);
  const [isRecheck, setIsRecheck] = useState(true);

  const { mutate: sendAboutPoint } = useAdminAboutPointMutation(uid);

  const { mutate: sendHeart } = useInteractionLikeMutation({
    onSuccess() {
      completeToast("free", "좋아요 전송 완료");
    },
    onError: errorToast,
  });

  useEffect(() => {
    if (!isRecheck) return;
    const isLikeRecord = (
      JSON.parse(localStorage.getItem(LIKE_HEART)) as IInteractionLikeStorage[]
    )?.find((who) => who.uid === uid);
    const isOverlap =
      isLikeRecord !== undefined &&
      dayjs().diff(dayjs(isLikeRecord?.date), "day") < LIKE_HEART_PERIOD;
    if (isArrivedCondition && !isOverlap && uid !== session?.uid)
      setIsHeart(true);
    else setIsHeart(false);
    setIsRecheck(false);
  }, [isArrivedCondition, uid, isRecheck, session?.uid]);

  const onClick = () => {
    sendHeart({
      to: uid,
      message: `${session?.user.name}님으로부터 좋아요를 받았어요!`,
    });
    sendAboutPoint(POINT_SYSTEM_PLUS.LIKE);
    pushArrToLocalStorage(LIKE_HEART, uid);
    setIsRecheck(true);
  };

  return (
    <Layout>
      <span>{name}</span>
      {isHeart && (
        <HeartWrapper
          onClick={onClick}
          animate="spin"
          variants={spinVariants}
          transition={spinTransition}
        >
          <FontAwesomeIcon icon={faCircleHeart} color="var(--color-red)" />
        </HeartWrapper>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 15px;
    margin-right: var(--margin-min);
  }
`;
const HeartWrapper = styled(motion.div)`
  margin-bottom: 3px;
  display: flex;
  align-items: center;
`;

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 2,
};

const spinVariants = {
  spin: {
    rotateY: [0, 360],
  },
};

export default StudySpaceUserCommentsName;
