import { IconButton, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useQueryClient } from "react-query";

import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
  ModalSubtitle,
  ModalXs,
  ModalMd,
} from "../../styles/layout/modal";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isVotingState,
  mySpaceFixedState,
  studyStartTimeState,
} from "../../recoil/studyAtoms";
import {
  useScoreMutation,
  useWarningScoreMutation,
} from "../../hooks/user/mutations";
import {
  useAbsentMutation,
  useAbsentStudyMutation,
  useDismissMutation,
} from "../../hooks/vote/mutations";
import { VOTE_GET } from "../../libs/queryKeys";
import { getToday } from "../../libs/utils/dateUtils";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { InputSm } from "../../components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

function AbsentStudyModal({ setIsModal }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const today = getToday();

  const setisVoting = useSetRecoilState(isVotingState);
  const studyStartTime = useRecoilValue(studyStartTimeState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const [isFirst, setIsFirst] = useState(true);
  const [isTooltip, setIsTooltip] = useState(false);
  const [value, setValue] = useState<string>("");

  const { mutate: getScore } = useScoreMutation({
    onError(error) {
      console.error(error);
    },
  });
  const { mutate: getWaring } = useWarningScoreMutation({
    onError(error) {
      console.error(error);
    },
  });

  const { mutate: absentStudy } = useAbsentStudyMutation(today, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(VOTE_GET);
      if (value !== "") {
        getWaring({ score: 1, message: "스터디 당일 불참" });
        if (dayjs() > studyStartTime) getScore(-10);
      }
      setisVoting(false);
    },
    onError: (err) => {
      toast({
        title: "오류",
        description: "불참처리 중 문제가 발생했어요. 다시 시도해보세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const handleCancleBtn = () => {
    if (mySpaceFixed) {
      absentStudy({ message: value });
    } else {
      toast({
        title: "오류",
        description: "오늘 스터디에 참여하지 않은 인원입니다",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setIsModal(false);
  };

  const onClickTooltop = () => {
    setIsTooltip((old) => !old);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Layout>
        <ModalHeaderLine>
          <Header>
            {!isTooltip ? <span>불참 경고</span> : <span>불참 인정 사유</span>}
            <div onClick={onClickTooltop}>
              <span>인정 사유</span>
              <IconWrapper
                onClick={onClickTooltop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  color="white"
                  background="var(--color-mint)"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                  size="xs"
                  onClick={onClickTooltop}
                />
              </IconWrapper>
            </div>
          </Header>
        </ModalHeaderLine>
        {isTooltip ? (
          <>
            <ModalMain>
              <TooltipInfo
                initial={{ opacity: 0, y: -120, x: 160, scale: 0 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              >
                <ol>
                  <li>
                    본인의 참여 시간이 다른 인원과 <b>1명 이하</b>로 겹치고,
                    <b> 1시간 이하</b>로 겹치는 경우
                  </li>
                  <li>
                    코로나 등의 <b>질병</b>에 걸린 경우
                    <br />
                    (단순 감기는 악용 방지를 위해 미 허용)
                  </li>
                  <li>관리자에게 따로 연락해서 동의를 구한 경우</li>
                </ol>
              </TooltipInfo>
            </ModalMain>
          </>
        ) : isFirst ? (
          <>
            <ModalMain>
              <ModalSubtitle>정말로 불참하실건가요? </ModalSubtitle>
              {dayjs() > studyStartTime ? (
                <div>
                  스터디 시작 시간이 이미 지났기 때문에 <b>경고 1회</b>와{" "}
                  <b>-10점</b>이 부여됩니다. 참여 시간을 변경해 보는 것은
                  어떨까요?
                </div>
              ) : (
                <div>
                  <b>경고 1회</b>가 부여됩니다.
                </div>
              )}
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setIsModal(false)}>취소</button>
              <button onClick={() => setIsFirst(false)}>다음</button>
            </ModalFooterNav>
          </>
        ) : (
          <>
            <ModalMain>
              <Subtitle>
                <div>불참이 인정되는 사유가 있다면 적어주세요! </div>

                <span>※ 해당하지 않는다면 적지 말아주세요</span>
              </Subtitle>
              <InputSm value={value} onChange={onChange} />
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setIsModal(false)}>취소</button>

              <button onClick={() => handleCancleBtn()}>불참</button>
            </ModalFooterNav>
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled(ModalMd)``;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    font-weight: 600;
    font-size: 12px;
    color: var(--color-mint);
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: 6px;
    }
  }
`;

const Subtitle = styled.div`
  margin-bottom: 12px;
  > div {
    margin-bottom: 4px;
    font-weight: 600;
  }
  > span:last-child {
    font-size: 12px;
  }
`;

const IconWrapper = styled(motion.div)``;

const TooltipInfo = styled(motion.div)`
  height: 100%;
  > ol {
    > li {
      margin-left: 12px;
      font-size: 13px;
      margin-bottom: 12px;
    }
  }
`;

export default AbsentStudyModal;
