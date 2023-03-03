import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CommentBox } from "../../components/common/CommentBox";
import { useArrivedMutation } from "../../hooks/vote/mutations";
import { VOTE_GET } from "../../libs/queryKeys";
import { getToday } from "../../libs/utils/dateUtils";
import { isAttendCheckModalState } from "../../recoil/modalAtoms";
import { BaseModal } from "../../styles/LayoutStyles";

export default function AttendCheckModal() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const setIsAttendCheckModal = useSetRecoilState(isAttendCheckModalState);
  const { mutate: handleArrived } = useArrivedMutation(getToday(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(VOTE_GET);
    },
    onError: (err) => {
      toast({
        title: "오류",
        description: "출석체크 중 문제가 발생했어요. 다시 시도해보세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });
  const onCancelClicked = () => {
    setIsAttendCheckModal(false);
  };
  const onCheckClicked = () => {
    handleArrived();
    setIsAttendCheckModal(false);
  };
  return (
    <Layout>
      <Title>출석체크</Title>
      <hr />
      <MainContent>
        <div>
          도착하셨나요? <br />
          자리나 인상착의를 간단하게 남겨주세요!
        </div>
        <CommentBox>
          <form id="AttendCheckForm">
            <Input placeholder="comment" />
          </form>
        </CommentBox>
      </MainContent>
      <Footer>
        <button type="button" onClick={onCancelClicked}>
          취소
        </button>
        <button type="submit" form="AttendCheckForm" onClick={onCheckClicked}>
          출석
        </button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(BaseModal)`
  width: 300px;
  height: 223px;
  padding: 15px;
`;
const Title = styled.span`
  font-family: "NanumEx";
  padding-bottom: 5px;
  margin-bottom: 5px;
`;
const MainContent = styled.main`
  margin-top: 10px;
  color: var(--font-black);
  font-size: 0.9em;
  > div {
    margin-bottom: 12px;
  }
`;
const Input = styled.input`
  height: 50px;
  width: 250px;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: end;
  margin-top: 0px;
  > button {
    background-color: lightgray;
    margin-left: 10px;
    width: 50px;
    border-radius: 10px;
  }
`;

export { Layout, Title, MainContent, Input };
