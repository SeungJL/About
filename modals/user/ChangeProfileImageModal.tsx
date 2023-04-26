import { Button } from "@chakra-ui/react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import {
  AVATAR_COLOR,
  PROFILE_ICON,
  VOTE_TABLE_COLOR,
} from "../../constants/design";
import { useAvatarMutation } from "../../hooks/user/mutations";
import { useAvatarQuery } from "../../hooks/user/queries";
import { ModalHeaderLine, ModalLg, ModalXs } from "../../styles/layout/modal";

function ChangeProfileImageModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [iconIdx, setIconIdx] = useState(0);
  const [back, setBack] = useState(false);
  const [BG, setBG] = useState(0);

  const { data } = useAvatarQuery();
  const { mutate } = useAvatarMutation();
  console.log(2, data);
  const onClickPrev = () => {
    if (iconIdx > 0) {
      setBack(true);
      setIconIdx(iconIdx - 1);
    }
  };

  const onClickNext = () => {
    if (iconIdx < PROFILE_ICON.length) {
      setBack(false);
      setIconIdx(iconIdx + 1);
    }
  };
  useEffect(() => {
    if (iconIdx === 0) setBack(false);
    if (iconIdx === PROFILE_ICON.length - 1) {
      setBack(true);
    }
  }, [iconIdx]);

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

  const onSubmit = () => {
    const info = {
      type: iconIdx,
      bg: BG,
    };
    mutate(info);
  };

  return (
    <>
      {isFirstPage ? (
        <Layout>
          <ModalHeaderLine>프로필 이미지 변경</ModalHeaderLine>
          <Main>
            <Choice>
              <div onClick={() => setIsFirstPage(false)}>캐릭터 선택</div>
              <div>카카오 프로필 업데이트</div>
            </Choice>
            <Footer>
              <button>취소</button>
              <button>변경</button>
            </Footer>
          </Main>
        </Layout>
      ) : (
        <SecondLayout>
          <ModalHeaderLine>프로필 이미지 변경</ModalHeaderLine>
          <UpPart>
            <ArrowIcon style={{ left: "0" }} onClick={onClickPrev}>
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
                <Icon style={{ background: AVATAR_COLOR[BG] }}>
                  <Image
                    width={80}
                    height={80}
                    unoptimized={true}
                    src={PROFILE_ICON[iconIdx]}
                    alt="avatar"
                  />
                </Icon>
                <IconPoint>30 point</IconPoint>
              </IconWrapper>
            </AnimatePresence>
            <ArrowIcon style={{ right: "0px" }} onClick={onClickNext}>
              {iconIdx !== PROFILE_ICON.length - 1 && (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </ArrowIcon>
          </UpPart>
          <DownPart>
            {AVATAR_COLOR.map((color, idx) => (
              <Color
                key={idx}
                style={{ backgroundColor: color }}
                onClick={() => setBG(idx)}
              />
            ))}
          </DownPart>
          <Footer>
            <Button onClick={() => setIsModal(false)}>취소</Button>
            <Button onClick={onSubmit}>변경</Button>
          </Footer>
        </SecondLayout>
      )}
    </>
  );
}

const Layout = styled(ModalXs)``;

const SecondLayout = styled(ModalLg)``;

const Choice = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 14px;
  font-weight: 600;
  padding: 20px 0;
  > div {
    border: 1px solid var(--font-h5);
    padding: 12px;
    background-color: var(--font-h7);
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: var(--font-h2);
  font-size: 13px;
`;

const UpPart = styled.div`
  flex: 1;
  border-bottom: 1px solid var(--font-h5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled(motion.div)`
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

const DownPart = styled.div`
  flex: 0.6;
  margin-bottom: 20px;

  margin-bottom: 10px;
  border-bottom: 1px solid var(--font-h5);
  display: flex;
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 8px;
    background-color: #e3e6eb;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #a0a4ae;
  }
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const IconPoint = styled.div`
  color: var(--color-mint);
`;

const Color = styled.div`
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const Footer = styled.footer`
  margin-top: 6px;
  display: flex;
  justify-content: space-around;
  > button {
    background-color: var(--color-red);
    color: white;
    width: 40%;
    height: 28px;
  }
  > button:first-child {
    background-color: var(--font-h4);
  }
  > button:last-child {
    background-color: var(--color-red);
    color: white;
  }
`;

export default ChangeProfileImageModal;
