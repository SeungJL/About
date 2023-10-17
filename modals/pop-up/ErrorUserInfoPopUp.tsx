import { signOut, useSession } from "next-auth/react";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { useCompleteToast } from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function ErrorUserInfoPopUp({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();

  const { mutate: sendRequest } = useUserRequestMutation({
    onSuccess() {
      completeToast("free", "전송이 완료되었습니다.");
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
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="유저 정보 오류" />
      <ModalBody>
        <ModalSubtitle>
          유저 정보에 오류가 있어 이용이 불가능합니다. 재접속을 한 뒤에도 같은
          오류가 발생하면 오류 전송을 눌러주세요! 관리자에게 별도로 말씀해주시면
          더 빠른 처리가 가능합니다.
        </ModalSubtitle>
      </ModalBody>
      <ModalFooterTwo
        leftText="로그아웃"
        rightText="오류전송"
        onClickLeft={logout}
        onClickRight={sendError}
        isFull={true}
      />
    </ModalLayout>
  );
}

export default ErrorUserInfoPopUp;
