import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function RequestSecedeModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const [value, setValue] = useState("");

  const { mutate } = useUserRequestMutation({
    onSuccess() {
      completeToast("free", "탈퇴가 완료되었습니다.");
      signOut();
    },
    onError(err) {
      console.error(err);
      failToast("error");
    },
  });

  const onSecede = () => {
    mutate({
      category: "탈퇴",
      content: value,
      writer: session?.user.name,
    });
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text="회원 탈퇴" />
      <ModalBody>
        <ModalSubtitle>탈퇴하시겠습니까?</ModalSubtitle>
        <span>
          보증금 환급을 원하신다면 아래에 계좌번호와 성함을 남겨주세요.
          확인하는대로 환급해 드리도록 하겠습니다. 단톡방은 직접 나가주시면
          됩니다 !
        </span>
        <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
        <Message>고생하셨어요 ~!</Message>
      </ModalBody>
      <ModalFooterTwo
        isFull={true}
        leftText="닫기"
        rightText="회원탈퇴"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onSecede}
      />
    </ModalLayout>
  );
}

const Textarea = styled.textarea`
  flex: 1;
  margin-top: var(--margin-sub);
  background-color: var(--input-bg);
  border-radius: var(--border-radius-sub);
  padding: var(--padding-md);
`;

const Message = styled.div`
  margin-top: var(--margin-main);
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  color: var(--font-h2);
`;

export default RequestSecedeModal;
