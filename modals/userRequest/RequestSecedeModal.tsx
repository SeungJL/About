import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import {
  ModalFooterTwo,
  ModalHeaderX,
} from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function RequestSecedeModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const [value, setValue] = useState("");

  const { mutate } = useUserRequestMutation({
    onSuccess() {
      completeToast("free", "탈퇴가 완료되었습니다.");
    },
    onError(err) {
      console.error(err);
      failToast("error");
    },
  });

  const onSecede = async () => {
    await mutate({
      category: "탈퇴",
      content: value,
      writer: session?.user.name,
    });
    await signOut();
  };

  return (
    <ModalLayout size="xl">
      <ModalHeaderX title="회원 탈퇴" setIsModal={setIsModal} />
      <ModalMain>
        <ModalSubtitle>탈퇴하시겠습니까?</ModalSubtitle>
        <span>
          보증금 환급을 원하신다면 아래에 본인의 계좌번호와 성함을 남겨주세요.
          확인하는대로 환급해 드리도록 하겠습니다. 단톡방은 직접 나가주시면
          됩니다 !
        </span>
        <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
        <Message>고생하셨어요 ~!</Message>
      </ModalMain>
      <ModalFooterTwo
        right="회원탈퇴"
        onSubmit={onSecede}
        setIsModal={setIsModal}
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
