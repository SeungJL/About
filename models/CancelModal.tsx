import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useDismissMutation } from "../hooks/vote/mutations";
import { VOTE_GET } from "../libs/queryKeys";
import { strToDate } from "../libs/utils/dateUtils";
import { isShowVoteCancleState } from "../recoil/atoms";

const CancelModalLayout = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const Header = styled.header`
  height: 30px;
`;
const Content = styled.div``;
const Footer = styled.footer``;

function CancelModal() {
  const router = useRouter();
  const today = strToDate(router.query.date as string);
  const queryClient = useQueryClient();
  const toast = useToast();
  const setIsShowCancle = useSetRecoilState(isShowVoteCancleState);

  const { mutate: handleDismiss, isLoading: dismissLoading } =
    useDismissMutation(today, {
      onSuccess: (data) => queryClient.invalidateQueries(VOTE_GET),
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
  );
}
export default CancelModal;
