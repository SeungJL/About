import { Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { ModalLeyou } from "../../components/modals/Modals";
import { useCompleteToast } from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function ErrorUserInfoPopUp({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();

  const { mutate: sendRequest } = useUserRequestMutation({
    onSuccess() {
      completeToast(
        "free",
        "전송이 완료되었습니다. 더 빠른 처리를 위해서는 관리자에게도 말씀해주세요!"
      );
      logout();
    },
  });

  const logout = () => {
    signOut();
    setIsModal(false);
  };

  const sendError = () => {
    sendRequest({
      title: "유저 정보 에러",
      category: "건의",
      writer: session.user.name,
      content: `에러 id: ${session.id}`,
    });
  };

  return (
    <ModalLeyou size="md">
      <Header>유저 정보 오류</Header>
      <ModalMain>
        <ModalSubtitle>
          현재 유저 정보에 오류가 있어 이용이 불가능합니다. 재접속을 시도해보고,
          같은 오류가 발생하면 오류 전송을 눌러주세요! 관리자에게 별도로
          말씀해주시면 더 빠른 처리가 가능합니다.
        </ModalSubtitle>
      </ModalMain>
      <ModalFooter>
        <Button w="50%" onClick={logout}>
          로그아웃
        </Button>
        <Button onClick={sendError} w="50%" colorScheme="mintTheme">
          오류전송
        </Button>
      </ModalFooter>
    </ModalLeyou>
  );
}

const Header = styled.header`
  font-size: 16px;
  font-weight: 700;
`;

const ModalFooter = styled.div``;

export default ErrorUserInfoPopUp;
