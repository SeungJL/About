import { useToast } from "@chakra-ui/react";
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
import { useDismissMutation } from "../../hooks/vote/mutations";
import { VOTE_GET } from "../../libs/queryKeys";
import { getToday } from "../../libs/utils/dateUtils";
import { useState } from "react";
import { InputSm } from "../../components/ui/Input";

function AbsentStudyModal({ setIsModal }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const today = getToday();

  const setisVoting = useSetRecoilState(isVotingState);
  const studyStartTime = useRecoilValue(studyStartTimeState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const [isFirst, setIsFirst] = useState(true);

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

  const { mutate: handleDismiss, isLoading: dismissLoading } =
    useDismissMutation(today, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(VOTE_GET);
        getWaring({ score: 1, message: "스터디 당일 불참" });
        if (dayjs() > studyStartTime) getScore(-10);
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
      handleDismiss();
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

  return (
    <>
      <Layout>
        <ModalHeaderLine>불참 경고</ModalHeaderLine>
        {isFirst ? (
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
        ) : (
          <ModalMain>
            <Subtitle>
              <div>불참이 인정되는 사유가 있다면 적어주세요! </div>

              <span>※ 해당하지 않는다면 적지 말아주세요</span>
            </Subtitle>
            <InputSm />
          </ModalMain>
        )}
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>취소</button>
          {/* <button onClick={handleCancleBtn}>불참</button> */}
          <button onClick={() => setIsFirst(false)}>불참</button>
        </ModalFooterNav>
      </Layout>
    </>
  );
}

const Layout = styled(ModalMd)``;

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

export default AbsentStudyModal;
