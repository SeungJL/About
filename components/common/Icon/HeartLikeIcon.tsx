import { faCircleHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { POINT_SYSTEM_PLUS } from "../../../constants/contentsValue/pointSystem";
import { LIKE_HEART } from "../../../constants/keys/localStorage";
import {
  isHeartCheckLocalStorage,
  pushArrToLocalStorage,
} from "../../../helpers/storageHelpers";
import { useAdminAboutPointMutation } from "../../../hooks/admin/mutation";
import { useCompleteToast, useErrorToast } from "../../../hooks/CustomToast";
import { useInteractionLikeMutation } from "../../../hooks/interaction/mutations";

interface IHeartLikeIcon {
  toUid: string;
}

function HeartLikeIcon({ toUid }: IHeartLikeIcon) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const [isShow, setIsShow] = useState(true);

  const { mutate: sendAboutPoint } = useAdminAboutPointMutation(toUid);
  const { mutate: sendHeart } = useInteractionLikeMutation({
    onSuccess() {
      completeToast("free", "좋아요 전송 완료");
    },
    onError: errorToast,
  });

  useEffect(() => {
    const isHeartCheck = isHeartCheckLocalStorage(toUid);
    if (!isHeartCheck) setIsShow(false);
  }, [toUid]);

  const onClick = () => {
    sendHeart({
      to: toUid,
      message: `${session?.user.name}님으로부터 좋아요를 받았어요!`,
    });
    sendAboutPoint(POINT_SYSTEM_PLUS.LIKE);
    pushArrToLocalStorage(LIKE_HEART, toUid);
    setIsShow(false);
  };

  return (
    <Layout
      onClick={onClick}
      animate="spin"
      variants={spinVariants}
      transition={spinTransition}
      isshow={isShow ? "true" : "false"}
    >
      <FontAwesomeIcon icon={faCircleHeart} color="var(--color-red)" />
    </Layout>
  );
}

const Layout = styled(motion.div)<{ isshow: "true" | "false" }>`
  margin-bottom: 3px;
  display: ${(props) => (props.isshow === "true" ? "flex" : "none")};
  align-items: center;
`;

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 2,
};

const spinVariants = {
  spin: {
    rotateY: [0, 360],
  },
};

export default HeartLikeIcon;
