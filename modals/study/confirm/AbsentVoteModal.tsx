import { Button, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  useScoreMutation,
  useWaringScoreMutation,
} from "../../../hooks/user/mutations";
import { useDismissMutation } from "../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../libs/queryKeys";
import { getToday, strToDate } from "../../../libs/utils/dateUtils";
import {
  isVotingState,
  mySpaceFixedState,
  studyStartTimeState,
} from "../../../recoil/studyAtoms";

import {
  ModalFooterNav,
  ModalHeaderTitle,
  ModalXs,
} from "../../../styles/LayoutStyles";

export default function AbsentVoteModal({ setIsModal }) {
  const today = getToday();
  const queryClient = useQueryClient();
  const toast = useToast();
  const setisVoting = useSetRecoilState(isVotingState);
  const studyStartTime = useRecoilValue(studyStartTimeState);
  const { mutate: getScore } = useScoreMutation();
  const { mutate: getWaring } = useWaringScoreMutation();
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const { mutate: handleDismiss, isLoading: dismissLoading } =
    useDismissMutation(today, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(VOTE_GET);
        getWaring(1);
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
        <ModalHeaderTitle>불참 경고</ModalHeaderTitle>
        <Content>
          <span>정말로 불참하실건가요? </span>
          {dayjs() > studyStartTime ? (
            <div>
              시작 시간이 지났기 때문에 <b>경고 1회</b>와 <b>-10점</b>이
              부여됩니다.
            </div>
          ) : (
            <div>
              <b>경고 1회</b>가 부여됩니다.
            </div>
          )}
        </Content>
        <Footer>
          <button onClick={() => setIsModal(false)}>취소</button>
          <button onClick={handleCancleBtn}>불참</button>
        </Footer>
      </Layout>
    </>
  );
}

const Layout = styled(ModalXs)`
  justify-content: space-between;
  height: 200px;
  color: var(--font-h2);
  font-size: 13px;
`;

const Content = styled.div`
  padding: 16px 0;
  flex: 1;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  > span:first-child {
    color: var(--font-h1);
    font-weight: 600;
  }
  > div {
    margin-top: 20px;
    height: 100%;

    width: 100%;
  }
`;
const Footer = styled(ModalFooterNav)``;
