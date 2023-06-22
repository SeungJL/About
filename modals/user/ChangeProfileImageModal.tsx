import { Button, useToast } from "@chakra-ui/react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

import { useAvatarMutation } from "../../hooks/user/mutations";
import { useScoreQuery } from "../../hooks/user/pointSystem/queries";
import { AVATAR_COLOR, AVATAR_COST, AVATAR_ICON } from "../../storage/Avatar";
import { ModalHeaderLine, ModalLg, ModalXs } from "../../styles/layout/modal";
import { IUser, kakaoProfileInfo } from "../../types/user";

function ChangeProfileImageModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const toast = useToast();
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [iconIdx, setIconIdx] = useState(0);
  const [back, setBack] = useState(false);
  const [BG, setBG] = useState(0);
  const { data: score } = useScoreQuery();

  const { mutate } = useAvatarMutation({
    onSuccess() {
      console.log("suc");
    },
    onError() {
      console.error("err");
    },
  });
  const { isLoading: isFetchingProfile, mutate: onUpdateProfile } = useMutation<
    kakaoProfileInfo,
    AxiosError
  >(
    "updateProfile",
    async () => {
      const res = await axios.patch("/api/user/profile");
      return res.data;
    },
    {
      onSuccess: (data: IUser) => {},
      onError: (error: AxiosError) => {
        console.error(error);
        toast({
          title: "업데이트 실패",
          description: "프로필 사진을 업데이트하려면 재로그인이 필요해요.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      },
    }
  );

  const onClickPrev = () => {
    if (iconIdx > 0) {
      setBack(true);
      setIconIdx(iconIdx - 1);
    }
  };

  const onClickNext = () => {
    if (iconIdx < AVATAR_ICON.length) {
      setBack(false);
      setIconIdx(iconIdx + 1);
    }
  };
  useEffect(() => {
    if (iconIdx === 0) setBack(false);
    if (iconIdx === AVATAR_ICON.length - 1) {
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
    if (AVATAR_COST[iconIdx] > score?.score) {
      toast({
        title: "아이콘 변경 실패",
        description: "프로필 변경을 위한 점수가 부족해요!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const info = {
      type: iconIdx,
      bg: BG,
    };
    console.log(2);
    mutate(info);
    // setIsModal(false);
    // location.reload();
  };

  const onClickKakao = () => {
    const info = {
      type: null,
      bg: null,
    };
    mutate(info);
    onUpdateProfile();
    setIsModal(false);
    location.reload();
  };

  return (
    <>
      {isFirstPage ? (
        <Layout>
          <ModalHeaderLine>프로필 이미지 변경</ModalHeaderLine>
          <Main>
            <Choice>
              <div onClick={() => setIsFirstPage(false)}>캐릭터 선택</div>
              <div onClick={onClickKakao}>카카오 프로필로 변경 / 업데이트</div>
            </Choice>
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
                    src={AVATAR_ICON[iconIdx]}
                    alt="avatar"
                  />
                </Icon>
                <IconPoint>{AVATAR_COST[iconIdx]}점 달성</IconPoint>
              </IconWrapper>
            </AnimatePresence>
            <ArrowIcon style={{ right: "0px" }} onClick={onClickNext}>
              {iconIdx !== AVATAR_ICON.length - 1 && (
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
  padding: 16px 0;
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
