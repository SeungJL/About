import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useDismissMutation } from "../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../libs/queryKeys";
import { getToday, strToDate } from "../../../libs/utils/dateUtils";
import { isVotingState } from "../../../recoil/studyAtoms";

import {
  ModalLg,
  FullScreen,
  ModalSm,
  ModalFooterNav,
  ModalHeaderTitle,
} from "../../../styles/LayoutStyles";

export default function LateChangeTimeModal({ setIsModal }) {
  const today = getToday();
  const queryClient = useQueryClient();
  const toast = useToast();
  const setisVoting = useSetRecoilState(isVotingState);

  const { mutate: handleDismiss, isLoading: dismissLoading } =
    useDismissMutation(today, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(VOTE_GET);
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
    handleDismiss();
    setIsModal(false);
  };
  return (
    <>
      <Layout>
        <ModalHeaderTitle>불참 경고</ModalHeaderTitle>
        <Content>
          <span>정말로 불참하실건가요? </span>

          <span>
            스터디 시작 시간이 지났기 때문에 지금 취소하시면 <b>경고 1회</b>를
            받습니다.
          </span>
        </Content>
        <Footer>
          <button onClick={() => setIsModal(false)}>취소</button>
          <button onClick={handleCancleBtn}>불참</button>
        </Footer>
      </Layout>
    </>
  );
}

const Layout = styled(ModalSm)`
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
`;
const Footer = styled(ModalFooterNav)``;
