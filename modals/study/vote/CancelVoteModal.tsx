import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useDismissMutation } from "../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../libs/queryKeys";
import { getToday, strToDate } from "../../../libs/utils/dateUtils";
import { isShowVoteCancleState } from "../../../recoil/modalAtoms";
import { isVotingState } from "../../../recoil/voteAtoms";

import { BaseModal, FullScreen } from "../../../styles/LayoutStyles";

const CancelModalLayout = styled(BaseModal)`
  width: 240px;
  height: 180px;
  top: 50%;
  justify-content: space-between;
`;

const Header = styled.header`
  padding-bottom: 7px;
  border-bottom: 1px solid var(--font-black);
  height: 30px;
`;
const Content = styled.div``;
const Footer = styled.footer`
  height: 30px;
  border-top: 1px solid var(--font-black);
  padding-top: 7px;
  text-align: end;
  > button {
    margin-right: 5px;
    border: 1px solid black;
    width: 50px;
    height: 25px;
    border-radius: 10px;
    padding: 3px;

    font-family: "-apple-system";
    font-size: 12px;
  }
`;

export default function CancelVoteModal() {
  const today = getToday();
  const queryClient = useQueryClient();
  const toast = useToast();
  const setIsShowCancle = useSetRecoilState(isShowVoteCancleState);
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
    setIsShowCancle(false);
  };
  return (
    <>
      <CancelModalLayout>
        <Header>경고</Header>
        <Content>
          정말로 불참하실건가요? <br /> 재참여는 할 수 없으며 불참으로 기록되어
          경고를 받을 수 있어요.
        </Content>
        <Footer>
          <button onClick={() => setIsShowCancle(false)}>취소</button>
          <button onClick={handleCancleBtn}>불참</button>
        </Footer>
      </CancelModalLayout>
      <FullScreen onClick={() => setIsShowCancle(false)} />
    </>
  );
}
