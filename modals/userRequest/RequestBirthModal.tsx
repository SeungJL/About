import { useSession } from "next-auth/react";
import styled from "styled-components";
import {
  ModalFooterTwo,
  ModalHeaderX,
} from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { useUserRoleQuery } from "../../hooks/user/queries";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function RequestBirthModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const { data: session } = useSession();

  const { data: role } = useUserRoleQuery();
  const { mutate } = useUserRequestMutation({
    onSuccess() {
      completeToast("success");
      setIsModal(false);
    },
  });

  const onClick = () => {
    if (role === "human") {
      failToast("free", "정식 멤버만 신청 가능합니다.");
      return;
    }
    mutate({
      writer: session?.user.name,
      category: "건의",
      title: "생일 비공개 신청",
      content: session?.uid as string,
    });
  };

  return (
    <ModalLayout size="sm">
      <ModalHeaderX title="생일 공개 설정" setIsModal={setIsModal} />
      <ModalMain>
        기본 설정으로 정식 멤버의 생일에는 축하를 위해 멤버게시판에 프로필이
        표시됩니다.
      </ModalMain>
      <ModalFooterTwo
        left="공개"
        right="비공개"
        setIsModal={setIsModal}
        onSubmit={onClick}
      />
    </ModalLayout>
  );
}

const Layout = styled.div``;

export default RequestBirthModal;
