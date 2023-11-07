import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UseMutateFunction } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ImageSlider from "../../../components/dataViews/imageSlider/ImageSlider";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import {
  AVATAR_COLOR,
  AVATAR_COST,
  AVATAR_ICON,
} from "../../../constants/contentsValue/avatar";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { usePointSystemQuery } from "../../../hooks/user/queries";
import { isGuestState } from "../../../recoil/userAtoms";
import { IModal } from "../../../types/reactTypes";
import { IAvatar } from "../../../types/user/user";

interface IRequestChangeProfileImageModalAvatar extends IModal {
  setUserAvatar: UseMutateFunction<
    void,
    AxiosError<unknown, any>,
    IAvatar,
    unknown
  >;
}

function RequestChangeProfileImageModalAvatar({
  setIsModal,
  setUserAvatar,
}: IRequestChangeProfileImageModalAvatar) {
  const failToast = useFailToast();

  const isGuest = useRecoilValue(isGuestState);

  const [iconIdx, setIconIdx] = useState(0);
  const [back, setBack] = useState(false);
  const [BG, setBG] = useState(0);

  const { data: score } = usePointSystemQuery("score");

  useEffect(() => {
    if (iconIdx === 0) setBack(false);
    if (iconIdx === AVATAR_ICON.length - 1) setBack(true);
  }, [iconIdx]);

  const handleMove = (type: "prev" | "next") => {
    if (type === "prev") {
      if (iconIdx === 0) return;
      setBack(true);
      setIconIdx(iconIdx - 1);
    }
    if (type === "next") {
      if (iconIdx === AVATAR_ICON.length) return;
      setBack(false);
      setIconIdx(iconIdx + 1);
    }
  };

  const onSubmit = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    if (AVATAR_COST[iconIdx] > score) {
      failToast("free", "프로필 변경을 위한 점수가 부족해요!");
      return;
    }
    setUserAvatar({ type: iconIdx, bg: BG });
    setIsModal(false);
  };

  return (
    <ModalLayout size="xl" onClose={() => setIsModal(false)}>
      <ModalHeader text="아바타 캐릭터 선택" />
      <ModalBody>
        <UpPart>
          <ArrowIcon isLeft={true} onClick={() => handleMove("prev")}>
            {iconIdx !== 0 && <FontAwesomeIcon icon={faChevronLeft} />}
          </ArrowIcon>
          <AnimatePresence>
            <IconWrapper
              custom={back}
              variants={variants}
              initial="entry"
              animate="center"
              exit="exit"
              key={iconIdx}
            >
              <Icon bg={AVATAR_COLOR[BG]}>
                <Image
                  width={80}
                  height={80}
                  src={AVATAR_ICON[iconIdx]}
                  alt="avatar"
                />
              </Icon>
              <IconPoint>{AVATAR_COST[iconIdx]}점 달성</IconPoint>
            </IconWrapper>
          </AnimatePresence>
          <ArrowIcon isLeft={false} onClick={() => handleMove("next")}>
            {iconIdx !== AVATAR_ICON.length - 1 && (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </ArrowIcon>
        </UpPart>
        <DownPart>
          <ImageSlider
            type="avatarColor"
            imageContainer={AVATAR_COLOR}
            onClick={(idx) => setBG(idx)}
          />
        </DownPart>
      </ModalBody>
      <ModalFooterOne text="변경" onClick={onSubmit} isFull={true} />
    </ModalLayout>
  );
}

const UpPart = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled(motion.div)`
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ArrowIcon = styled.div<{ isLeft: boolean }>`
  position: absolute;
  left: ${(props) => props.isLeft && "0"};
  right: ${(props) => !props.isLeft && "0"};
  top: 50%;
  transform: translate(0, -50%);
`;

const DownPart = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  border-top: var(--border-main-light);
  border-bottom: var(--border-main-light);
  margin-bottom: var(--margin-min);
`;

const Icon = styled.div<{ bg: string }>`
  width: 100px;
  height: 100px;
  margin-bottom: var(--margin-sub);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
`;

const IconPoint = styled.div`
  color: var(--color-mint);
`;

const variants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -200 : 200,
    opacity: 0,
    scale: 0.5,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 200 : -200,
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.4 },
  }),
};
export default RequestChangeProfileImageModalAvatar;
