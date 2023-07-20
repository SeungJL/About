import { Button } from "@chakra-ui/react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UseMutateFunction } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import { useFailToast } from "../../../hooks/CustomToast";
import { useScoreQuery } from "../../../hooks/user/pointSystem/queries";
import { isGuestState } from "../../../recoil/userAtoms";
import {
  AVATAR_COLOR,
  AVATAR_COST,
  AVATAR_ICON,
} from "../../../storage/avatar";
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

  const { data: score } = useScoreQuery();

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
    if (AVATAR_COST[iconIdx] > score.score) {
      failToast("free", "프로필 변경을 위한 점수가 부족해요!");
      return;
    }
    setUserAvatar({ type: iconIdx, bg: BG });
    setIsModal(false);
  };

  return (
    <ModalLayout size="xl">
      <ModalHeaderX title="아바타 캐릭터 선택" setIsModal={setIsModal} />
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
                unoptimized={true}
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
        {AVATAR_COLOR.map((color, idx) => (
          <Color key={idx} bg={color} onClick={() => setBG(idx)} />
        ))}
      </DownPart>
      <Button onClick={onSubmit} colorScheme="mintTheme">
        변경
      </Button>
    </ModalLayout>
  );
}

const UpPart = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: var(--border-main-light);
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
  flex: 0.4;
  margin-bottom: var(--margin-max);
  display: flex;
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 4px;
    background-color: var(--font-h6);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--font-h4);
  }
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

const Color = styled.div<{ bg: string }>`
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  margin-right: var(--margin-sub);
  background-color: ${(props) => props.bg};
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
